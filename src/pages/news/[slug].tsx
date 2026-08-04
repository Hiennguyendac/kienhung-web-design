import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { SEO, absoluteUrl, normalizeDescription } from "../../components/SEO";
import { getPostBySlug } from "../../lib/posts";
import { fetchPostViews, incrementPostView, subscribePostViews } from "../../lib/postViews";
import { SectionReveal } from "../../components/effects";
import "../News.css";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [views, setViews] = useState<number | null>(null);

  const formatDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatViews = (value?: number | null) => {
    if (typeof value !== "number") return "—";
    return new Intl.NumberFormat("vi-VN").format(value);
  };

  useEffect(() => {
    if (!post?.slug) return;
    let isActive = true;

    fetchPostViews([post.slug]).then((data) => {
      if (!isActive) return;
      setViews(data[post.slug] ?? 0);
    });

    incrementPostView(post.slug).then((value) => {
      if (!isActive) return;
      if (typeof value === "number") setViews(value);
    });

    const unsubscribe = subscribePostViews([post.slug], (_slug, nextViews) => {
      setViews(nextViews);
    });

    return () => {
      isActive = false;
      if (unsubscribe) unsubscribe();
    };
  }, [post?.slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <SEO
          title="Không tìm thấy | Kiến Hưng Investment"
          description="Không tìm thấy bài viết yêu cầu."
          canonicalPath="/tin-tuc"
          noindex
        />
        <Header />
        <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
          <div className="news-wrap">
            <div className="news-empty">
              <h1>Không tìm thấy bài viết</h1>
              <p>Đường dẫn không tồn tại hoặc bài viết đã được gỡ khỏi hệ thống.</p>
              <Link className="btn-link" to="/tin-tuc">
                ← Quay lại Tin tức
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articleDescription = normalizeDescription(post.description?.trim() || post.excerpt);
  const articleCanonicalPath = `/tin-tuc/${encodeURIComponent(post.slug)}`;
  const articleImage = post.image || "/logo-512.png";

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={articleDescription}
        canonicalPath={articleCanonicalPath}
        ogImage={articleImage}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": post.title,
          "datePublished": post.date || undefined,
          "dateModified": post.date || undefined,
          "description": articleDescription,
          "author": {
            "@type": post.author ? "Person" : "Organization",
            "name": post.author || "Kiến Hưng Investment",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Công ty TNHH Thương mại Dịch vụ Đầu tư Kiến Hưng",
            "logo": {
              "@type": "ImageObject",
              "url": "https://kienhunginvest.com/logo-512.png",
            },
          },
          "image": [absoluteUrl(articleImage)],
          "mainEntityOfPage": absoluteUrl(articleCanonicalPath),
          "inLanguage": "vi-VN",
        }}
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="news-wrap">
          <button
            type="button"
            className="btn-link btn-link--back"
            onClick={() => {
              const from = (location.state as { from?: string } | null)?.from;
              if (from) {
                navigate(from);
              } else {
                navigate("/tin-tuc");
              }
            }}
          >
            ← Quay lại Tin tức
          </button>
          <article className="news-detail">
            <SectionReveal className="news-detail-header">
              <h1>{post.title}</h1>
              <div className="news-meta">
                <span className="badge">{post.category || "Tin tức"}</span>
                <span>{formatDate(post.date)}</span>
                <span className="news-views">{formatViews(views)} lượt xem</span>
              </div>
            </SectionReveal>
            {post.image ? (
              <SectionReveal delay={0.08} className="news-hero-media">
                <img src={post.image} alt={post.title} loading="lazy" />
              </SectionReveal>
            ) : null}
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <SectionReveal>
                      <h2>{children}</h2>
                    </SectionReveal>
                  ),
                  h2: ({ children }) => (
                    <SectionReveal>
                      <h2>{children}</h2>
                    </SectionReveal>
                  ),
                  h3: ({ children }) => (
                    <SectionReveal>
                      <h3>{children}</h3>
                    </SectionReveal>
                  ),
                  p: ({ children }) => (
                    <SectionReveal>
                      <p>{children}</p>
                    </SectionReveal>
                  ),
                  ul: ({ children }) => (
                    <SectionReveal>
                      <ul>{children}</ul>
                    </SectionReveal>
                  ),
                  ol: ({ children }) => (
                    <SectionReveal>
                      <ol>{children}</ol>
                    </SectionReveal>
                  ),
                  blockquote: ({ children }) => (
                    <SectionReveal>
                      <blockquote>{children}</blockquote>
                    </SectionReveal>
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
