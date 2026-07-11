"use client";

import React, { useEffect, useMemo } from "react";
import { navigateTo } from "../../../utils/navigation";
import { IconPlus } from "@tabler/icons-react";
import { BookOpen, Eye, Heart } from "lucide-react";
import { useBlogs } from "../../../lib/service/query/useBlog";
import { useAlert } from "../../../context/AlertContext";
import { getApiErrorMessage } from "../../../utils/errors";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: "bg-white border-hairline text-ink-soft",
  PENDING_REVIEW: "bg-amber-50 border-amber-200 text-amber-700",
  PUBLISHED: "bg-mint/20 border-mint text-forest",
  REJECTED: "bg-red-50 border-red-200 text-red-700",
  SUSPENDED: "bg-clay-tint border-clay/30 text-clay",
};

export default function AdminArticlesSection() {
  const { showAlert } = useAlert();
  // The API has no authorType filter, so we fetch broadly and narrow to admin-authored
  // posts on the client. This is a shared "Admin Articles" workspace, not scoped to
  // "my own" posts, since there's no admin-profile endpoint to identify the current admin.
  const { data: blogs, isLoading, error } = useBlogs({ size: 100 });

  useEffect(() => {
    if (error) {
      showAlert(`API Error: ${getApiErrorMessage(error, "Failed to load admin articles.")}`, "error");
    }
  }, [error]);

  const adminBlogs = useMemo(() => (blogs || []).filter((b: any) => b.authorType === "ADMIN"), [blogs]);

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => navigateTo("/admin/blogs/new")}
          className="bg-forest text-white hover:bg-forest/90 text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer flex items-center space-x-2"
          id="admin-new-blog-btn"
        >
          <IconPlus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white h-28 rounded-2xl border border-hairline" />
          ))}
        </div>
      ) : adminBlogs.length === 0 ? (
        <div className="bg-white border border-hairline rounded-3xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-sprout mx-auto" />
          <h3 className="font-display font-bold text-forest">No admin-authored articles yet</h3>
          <p className="text-xs text-ink-soft max-w-sm mx-auto">
            Publish wellness guidance directly from the Hitha team.
          </p>
          <button
            onClick={() => navigateTo("/admin/blogs/new")}
            className="bg-forest text-white hover:bg-forest/90 text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer inline-flex items-center space-x-2"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Write an article</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {adminBlogs.map((blog: any) => (
            <button
              key={blog.id}
              onClick={() => navigateTo(`/admin/blogs/${blog.id}`)}
              className="w-full text-left bg-white border border-hairline hover:border-forest/30 shadow-resting hover:shadow-elevated rounded-2xl p-5 transition-all cursor-pointer flex items-center gap-4"
            >
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="w-16 h-16 rounded-xl object-cover border border-hairline shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-cream border border-hairline flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-sprout" />
                </div>
              )}

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLES[blog.status] || STATUS_STYLES.DRAFT}`}>
                    {blog.status.replace(/_/g, " ")}
                  </span>
                  <span className="text-[9px] font-semibold text-ink-faint">By {blog.author?.name || "Admin"}</span>
                </div>
                <h3 className="font-display font-bold text-forest text-sm truncate">{blog.title}</h3>
                {blog.status === "PUBLISHED" && (
                  <div className="flex items-center gap-3 text-[10px] text-ink-faint">
                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{blog.views || 0} views</span>
                    <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{blog.likeCount || 0} likes</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
