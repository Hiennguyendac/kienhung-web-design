import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Seo } from "../../components/Seo";
import { getPostBySlug } from "../../lib/posts";
import "../News.css";

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const post = slug ? getPostBySlug(slug) : undefined;

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

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title="Không tìm thấy | Kiến Hưng Investment"
          description="Không tìm thấy bài viết yêu cầu."
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

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} | Kiến Hưng Investment`}
        description={post.description?.trim() || post.excerpt}
        keywords={`${post.category || "Tin tức"}, Kiến Hưng Investment`}
        canonical={`https://kienhunginvest.com/tin-tuc/${encodeURIComponent(post.slug)}`}
        image={post.image || undefined}
        type="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": post.title,
          "datePublished": post.date || undefined,
          "dateModified": post.date || undefined,
          "description": post.description?.trim() || post.excerpt,
          "author": {
            "@type": "Organization",
            "name": "Kiến Hưng Investment",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Kiến Hưng Investment",
            "logo": {
              "@type": "ImageObject",
              "url": "https://kienhunginvest.com/favicon.jpg",
            },
          },
          "image": post.image ? [post.image] : undefined,
          "mainEntityOfPage": `https://kienhunginvest.com/tin-tuc/${encodeURIComponent(post.slug)}`,
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
            <header className="news-detail-header">
              <h1>{post.title}</h1>
              <div className="news-meta">
                <span className="badge">{post.category || "Tin tức"}</span>
                <span>{formatDate(post.date)}</span>
              </div>
            </header>
            {post.image ? (
              <div className="news-hero-media">
                <img src={post.image} alt={post.title} loading="lazy" />
              </div>
            ) : null}
            <div className="prose">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </div>
  );
}
