"use client";

import { useState, useRef, useEffect } from "react";

const NAV_ITEMS = [
  {
    label: "Test Preparation",
    href: "#",
    children: [
      { label: "IELTS", href: "#" },
      { label: "TOEFL", href: "#" },
      { label: "PTE", href: "#" },
      { label: "SAT", href: "#" },
    ],
  },
  {
    label: "Study Abroad",
    href: "#",
    active: true,
    children: [
      {
        label: "Study in Australia",
        href: "#",
        children: [
          { label: "Universities in Australia", href: "#" },
          { label: "Courses in Australia", href: "#" },
          { label: "Student Visa Australia", href: "#" },
        ],
      },
      {
        label: "Study in New Zealand",
        href: "#",
        children: [
          { label: "Universities in NZ", href: "#" },
          { label: "Courses in NZ", href: "#" },
          { label: "Student Visa NZ", href: "#" },
        ],
      },
      { label: "Study in UK", href: "#" },
      { label: "Study in USA", href: "#" },
      { label: "Study in Canada", href: "#" },
    ],
  },
  { label: "Universities", href: "#" },
  {
    label: "Services",
    href: "#",
    children: [
      { label: "Visa Assistance", href: "#" },
      { label: "Accommodation", href: "#" },
      { label: "Scholarship Guidance", href: "#" },
    ],
  },
  {
    label: "Popular Courses",
    href: "#",
    children: [
      { label: "MBA", href: "#" },
      { label: "Engineering", href: "#" },
      { label: "Medicine", href: "#" },
    ],
  },
  { label: "Blogs", href: "#" },
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "Our Story", href: "#" },
      { label: "Team", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    label: "Contact Us",
    href: "#",
    children: [
      { label: "Kathmandu Office", href: "#" },
      { label: "Sydney Office", href: "#" },
    ],
  },
  
];

type NavChild = {
  label: string;
  href: string;
  children?: NavChild[];
};

type NavItem = {
  label: string;
  href: string;
  active?: boolean;
  children?: NavChild[];
};

function FlyoutMenu({
  items,
  level = 0,
}: {
  items: NavChild[];
  level?: number;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={`flyout-menu level-${level}`}
      style={{
        position: "absolute",
        top: level === 0 ? "100%" : "0",
        left: level === 0 ? "0" : "100%",
        minWidth: "220px",
        background: "#fff",
        borderTop: level === 0 ? "3px solid #c0392b" : "none",
        boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
        zIndex: 1000 + level,
        padding: "6px 0",
        borderRadius: level === 0 ? "0 0 6px 6px" : "0 6px 6px 6px",
        animation: "fadeSlideIn 0.18s ease",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{ position: "relative" }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <a
            href={item.href}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              color: hoveredIndex === i ? "#c0392b" : "#2d2d2d",
              background: hoveredIndex === i ? "#fff5f5" : "transparent",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "13.5px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
          >
            {item.label}
            {item.children && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
                style={{ opacity: 0.7, marginLeft: 8 }}
              >
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </a>
          {item.children && hoveredIndex === i && (
            <FlyoutMenu items={item.children} level={level + 1} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function TheNextHeader() {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .thenext-header {
          position: sticky;
          top: 0;
          z-index: 999;
          background: #fff;
          transition: box-shadow 0.25s ease;
          font-family: 'Poppins', sans-serif;
        }
        .thenext-header.scrolled {
          box-shadow: 0 2px 24px rgba(192,57,43,0.10);
        }

        .header-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 28px;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 0;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 28px;
        }
        .logo-icon {
          width: 46px;
          height: 46px;
        }
        .logo-text {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 0.01em;
          color: #c0392b;
          line-height: 1;
        }
        .logo-text span { color: #1a1a1a; }

        nav {
          display: flex;
          align-items: center;
          gap: 0;
          flex: 1;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 11px;
          font-size: 13px;
          font-weight: 500;
          color: #2d2d2d;
          text-decoration: none;
          cursor: pointer;
          border-radius: 4px;
          transition: color 0.15s ease, background 0.15s ease;
          white-space: nowrap;
          user-select: none;
          background: none;
          border: none;
          font-family: 'Poppins', sans-serif;
        }
        .nav-link:hover, .nav-link.active {
          color: #c0392b;
        }
        .nav-link.open {
          color: #c0392b;
          background: #fff5f5;
        }
        .caret {
          width: 10px;
          height: 10px;
          transition: transform 0.2s;
        }
        .caret.open { transform: rotate(180deg); }

        .cta-btn {
          margin-left: auto;
          flex-shrink: 0;
          display: inline-block;
          padding: 10px 18px;
          background: #c0392b;
          color: #fff !important;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: background 0.18s ease, transform 0.15s ease, box-shadow 0.18s;
          box-shadow: 0 2px 12px rgba(192,57,43,0.18);
          letter-spacing: 0.01em;
        }
        .cta-btn:hover {
          background: #a93226;
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(192,57,43,0.28);
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
          color: #c0392b;
        }

        .mobile-menu {
          display: none;
          position: absolute;
          top: 68px;
          left: 0;
          right: 0;
          background: #fff;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          padding: 12px 0 20px;
          z-index: 998;
          border-top: 2px solid #c0392b;
          animation: fadeSlideIn 0.2s ease;
        }
        .mobile-menu.open { display: block; }
        .mobile-link {
          display: block;
          padding: 11px 28px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #2d2d2d;
          text-decoration: none;
          transition: color 0.15s, background 0.15s;
        }
        .mobile-link:hover { color: #c0392b; background: #fff5f5; }
        .mobile-cta {
          display: block;
          margin: 14px 28px 0;
          padding: 12px 18px;
          background: #c0392b;
          color: #fff;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          nav { display: none; }
          .cta-btn { display: none; }
          .hamburger { display: flex; margin-left: auto; }
        }
        @media (max-width: 480px) {
          .header-inner { padding: 0 16px; }
          .logo-text { font-size: 19px; }
        }
      `}</style>

      <header
        ref={headerRef}
        className={`thenext-header${scrolled ? " scrolled" : ""}`}
        style={{ position: "sticky" }}
      >
        <div className="header-inner">
          {/* Logo */}
          <a href="/" className="logo-area">
            <svg className="logo-icon" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="23" cy="23" r="23" fill="#fff1f0" />
              {/* Book pages */}
              <path d="M12 30 Q23 16 34 30" stroke="#c0392b" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
              <path d="M23 16 L23 30" stroke="#c0392b" strokeWidth="2.2" strokeLinecap="round"/>
              {/* Person above */}
              <circle cx="23" cy="11" r="3.5" fill="#c0392b"/>
              <path d="M18 20 Q23 15 28 20" stroke="#c0392b" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <span className="logo-text">
              THE<span>NEXT</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav>
            {NAV_ITEMS.map((item: NavItem, i) => (
              <div
                key={i}
                className="nav-item"
                onMouseEnter={() => item.children ? setOpenMenu(i) : undefined}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <a
                  href={item.href}
                  className={`nav-link${item.active ? " active" : ""}${openMenu === i ? " open" : ""}`}
                  onClick={(e) => item.children && e.preventDefault()}
                >
                  {item.label}
                  {item.children && (
                    <svg className={`caret${openMenu === i ? " open" : ""}`} viewBox="0 0 10 10" fill="none">
                      <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </a>
                {item.children && openMenu === i && (
                  <FlyoutMenu items={item.children} level={0} />
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <a href="#" className="cta-btn">Book Free Consultation</a>

          {/* Hamburger */}
          <button
            className="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu${mobileOpen ? " open" : ""}`}>
          {NAV_ITEMS.map((item, i) => (
            <a key={i} href={item.href} className="mobile-link">
              {item.label}
            </a>
          ))}
          <a href="#" className="mobile-cta">Meet The Representative</a>
        </div>
      </header>
    </>
  );
}