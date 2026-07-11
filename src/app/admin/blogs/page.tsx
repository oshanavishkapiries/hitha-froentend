"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppShell from "../../../components/AppShell";
import AdminSidebarShell from "../../../components/admin/AdminSidebarShell";
import { usePendingBlogs } from "../../../lib/service/query/useAdmin";
import ReviewQueueSection from "../../../components/admin/blogs/ReviewQueueSection";
import AdminArticlesSection from "../../../components/admin/blogs/AdminArticlesSection";
import AllBlogsSection from "../../../components/admin/blogs/AllBlogsSection";

type BlogTab = "review" | "mine" | "all";

const TAB_META: Record<BlogTab, { label: string; title: string; subtitle: string }> = {
  review: {
    label: "Review Queue",
    title: "Blogs · Review Queue",
    subtitle: "Approve or reject articles doctors have submitted for publication.",
  },
  mine: {
    label: "Admin Articles",
    title: "Blogs · Admin Articles",
    subtitle: "Wellness content authored directly by the Hitha admin team.",
  },
  all: {
    label: "All Blogs",
    title: "Blogs · All Articles",
    subtitle: "Monitor every article live or in progress across the platform, by doctors and admins alike.",
  },
};

function AdminBlogsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("view") as BlogTab) || "review";
  const [activeTab, setActiveTab] = useState<BlogTab>(
    ["review", "mine", "all"].includes(initialTab) ? initialTab : "review"
  );

  const { data: pendingBlogs } = usePendingBlogs();
  const pendingCount = (pendingBlogs || []).length;

  const meta = TAB_META[activeTab];

  return (
    <AppShell>
      <AdminSidebarShell activeNav="blogs" title={meta.title} subtitle={meta.subtitle}>
        {/* Tab Bar */}
        <div className="flex flex-wrap gap-2 border-b border-hairline pb-4 mb-6">
          {(Object.keys(TAB_META) as BlogTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-2 ${
                activeTab === tab
                  ? "bg-forest text-white border-forest"
                  : "bg-white border-hairline text-ink-soft hover:border-forest/30"
              }`}
              id={`admin-blogs-tab-${tab}`}
            >
              <span>{TAB_META[tab].label}</span>
              {tab === "review" && pendingCount > 0 && (
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-full ${
                    activeTab === tab ? "bg-white/20 text-white" : "bg-red-500 text-white"
                  }`}
                >
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {activeTab === "review" && <ReviewQueueSection />}
        {activeTab === "mine" && <AdminArticlesSection />}
        {activeTab === "all" && <AllBlogsSection />}
      </AdminSidebarShell>
    </AppShell>
  );
}

export default function AdminBlogsPage() {
  return (
    <Suspense fallback={null}>
      <AdminBlogsContent />
    </Suspense>
  );
}
