import { X, BookOpen, Clock, Heart, ShieldAlert } from 'lucide-react';

interface BlogsModalProps {
  onClose: () => void;
}

export default function BlogsModal({ onClose }: BlogsModalProps) {
  const blogs = [
    {
      id: 'blog-1',
      title: 'Navigating Therapy Stigma in Sri Lanka: A Guide to Anonymous Healing',
      category: 'Mental Wellness',
      readTime: '4 min read',
      excerpt: 'Seeking support for anxiety or stress shouldn’t feel socially daunting. Here is how modern anonymous consults help Sri Lankans take control of their healing safely.',
      content: 'In many local households, conversations around mental health remain a silent subject. This often prevents individuals from reaching out to licensed professionals when dealing with burnout, grief, or mood imbalances. By leveraging privacy-first technologies, platforms like Hitha allow you to connect with accredited counselors, clinical psychologists, and consultants using pseudonyms, removing social friction and ensuring your healing remains entirely your own business.',
      author: 'Hitha Care Team',
      date: 'July 2, 2026'
    },
    {
      id: 'blog-2',
      title: 'Understanding Specializations: Psychologist vs. Psychiatrist',
      category: 'Clinical Care',
      readTime: '6 min read',
      excerpt: 'Struggling to decide who is the right professional for your needs? We break down the functional differences between counselors, therapists, psychologists, and medical psychiatrists.',
      content: 'Choosing the correct mental health specialist is half the journey. Counselors and Clinical Counselors provide supportive talking therapies for situational stress and life challenges. Psychologists and Clinical Psychologists focus on behavioral rehabilitation, testing, and therapies like CBT (Cognitive Behavioral Therapy). Consultant Psychiatrists are medical doctors who diagnose clinical disorders and can prescribe medications where necessary. Knowing this helps you lock in the ideal slot on our directory.',
      author: 'Clinical Advisory Panel',
      date: 'June 28, 2026'
    },
    {
      id: 'blog-3',
      title: 'Why Escrow Payments Create a Safe Environment for Telehealth',
      category: 'Platform Security',
      readTime: '3 min read',
      excerpt: 'We believe security goes beyond anonymous profiles. Learn how our secure escrow payment system protects both patients and clinical consultants in Sri Lanka.',
      content: 'Trust and confidence are essential for therapeutic success. Our secure escrow protocol ensures that your booking fees are held in a secure state until your session is completed. No credit card details or bank routing info are ever stored on Hitha. If a therapist needs to reschedule or cancel, your funds are seamlessly released back to you, guaranteeing absolute peace of mind during your mental wellness journey.',
      author: 'Hitha Security Desk',
      date: 'May 15, 2026'
    }
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-card w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-elevated border border-hairline">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-hairline bg-cream/40">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-forest" />
            <span className="font-display font-semibold text-base text-forest">Hitha Community Wellness Blogs</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-cream text-ink-soft hover:text-ink transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-sans font-bold text-moss uppercase tracking-wider">Compassionate Reading</span>
            <h3 className="font-display font-bold text-2xl text-forest">Healing through Understanding</h3>
            <p className="text-xs text-ink-soft max-w-md mx-auto">
              Our curated library brings you insights from local advocates and medical experts on mental health, safety, and modern therapy.
            </p>
          </div>

          <div className="space-y-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-cream/20 border border-hairline rounded-sub p-5 space-y-3 hover:bg-cream/40 transition-colors">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="bg-sprout/40 text-forest px-2 py-0.5 rounded-full font-sans font-semibold uppercase tracking-wider">
                    {blog.category}
                  </span>
                  <div className="flex items-center space-x-2 text-ink-faint">
                    <Clock className="w-3 h-3" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                <h4 className="font-display font-bold text-base sm:text-lg text-forest leading-tight">
                  {blog.title}
                </h4>

                <p className="text-xs text-ink-soft leading-relaxed">
                  {blog.excerpt}
                </p>

                <div className="bg-white p-3 rounded-small border border-hairline text-xs text-ink-soft italic leading-relaxed">
                  {blog.content}
                </div>

                <div className="flex justify-between items-center text-[10px] text-ink-faint pt-2 border-t border-hairline/60">
                  <span className="font-sans">By <span className="font-semibold text-ink-soft">{blog.author}</span></span>
                  <span>Published {blog.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-hairline bg-cream/20 text-center flex justify-center items-center space-x-1">
          <Heart className="w-3.5 h-3.5 text-clay" />
          <p className="text-[10px] text-ink-soft font-sans font-medium">
            Written with warmth for Sri Lankan communities.
          </p>
        </div>
      </div>
    </div>
  );
}
