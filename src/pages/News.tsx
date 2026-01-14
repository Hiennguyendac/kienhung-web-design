import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Seo } from "../components/Seo";
import { getAllPosts } from "../lib/posts";
import "./News.css";

export default function News() {
  const pageSize = 4;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPage = Number(searchParams.get("page") || "1");
  const [page, setPage] = useState(Number.isNaN(initialPage) ? 1 : initialPage);
  const posts = useMemo(() => {
    return getAllPosts().sort((a, b) => {
      const da = new Date(a.date || "1970-01-01").getTime();
      const db = new Date(b.date || "1970-01-01").getTime();
      return db - da;
    });
  }, []);
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize));
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
      setSearchParams({ page: String(totalPages) });
    }
  }, [page, totalPages, setSearchParams]);

  useEffect(() => {
    const current = Number(searchParams.get("page") || "1");
    if (!Number.isNaN(current) && current !== page) {
      setPage(current);
    }
  }, [searchParams, page]);
  const pagedPosts = useMemo(() => {
    const start = (page - 1) * pageSize;
    return posts.slice(start, start + pageSize);
  }, [page, pageSize, posts]);

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

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Tin tức | Kiến Hưng Investment"
        description="Tin tức mới nhất từ Kiến Hưng Investment."
        keywords="tin tức, kiến hưng investment, bài viết, cập nhật"
        canonical="https://kienhunginvest.com/tin-tuc"
        type="website"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Tin tức Kiến Hưng Investment",
          "itemListElement": posts.map((p, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "url": `https://kienhunginvest.com/tin-tuc/${encodeURIComponent(p.slug)}`,
            "name": p.title,
          })),
        }}
      />
      <Header />
      <main className="container mx-auto px-6 lg:px-12 py-10 lg:py-14">
        <div className="news-wrap">
          <section className="news-hero-banner">
            <div>
              <p className="news-kicker">Tin tức &amp; sự kiện</p>
              <h1>Cập nhật mới nhất từ Kiến Hưng</h1>
              <p>
                Hoạt động kinh doanh, hợp tác chiến lược và các chương trình hỗ trợ khách hàng được
                cập nhật thường xuyên.
              </p>
            </div>
            <a
              className="news-cta"
              href="mailto:contact@kienhunginvest.vn?subject=Dang%20ky%20nhan%20tin"
            >
              Đăng ký nhận tin
            </a>
          </section>

          {posts.length === 0 ? (
            <div className="news-empty">
              <h3>Chưa có bài viết nào</h3>
              <p>Vui lòng quay lại sau để xem các cập nhật mới nhất.</p>
            </div>
          ) : (
            <>
              <div className="news-grid">
                {pagedPosts.map((p) => {
                  const summary = p.description?.trim() || p.excerpt;
                  return (
                    <article key={p.slug} className="news-card">
                      {p.image ? (
                        <div className="news-card-media">
                          <img src={p.image} alt={p.title} loading="lazy" />
                        </div>
                      ) : null}
                      <div className="news-meta">
                        <span className="badge">{p.category || "Tin tức"}</span>
                        <span>{formatDate(p.date)}</span>
                      </div>

                      <h3>{p.title}</h3>
                      <p>{summary}</p>

                      <Link
                        className="btn-link"
                        to={`/tin-tuc/${encodeURIComponent(p.slug)}`}
                        state={{ from: `/tin-tuc?page=${page}` }}
                      >
                        Đọc thêm
                      </Link>
                    </article>
                  );
                })}
              </div>

              <div className="news-pagination">
                <button
                  type="button"
                  className="btn-page"
                  onClick={() => {
                    const next = Math.max(1, page - 1);
                    setPage(next);
                    setSearchParams({ page: String(next) });
                  }}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span className="news-page-indicator">
                  {page} / {totalPages}
                </span>
                <button
                  type="button"
                  className="btn-page"
                  onClick={() => {
                    const next = Math.min(totalPages, page + 1);
                    setPage(next);
                    setSearchParams({ page: String(next) });
                  }}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
