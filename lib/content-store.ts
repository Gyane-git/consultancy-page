import getPool from "@/lib/db";
import type { RowDataPacket } from "mysql2";

let initPromise: Promise<void> | null = null;

const defaultDestinations = [
  { slug: "australia", name: "Australia", shortText: "Go8 universities & regional PR benefits.", longText: "Australia offers globally recognized universities, strong student support, and clear post-study pathways. We help you choose the right city, institution, and course based on your goals." },
  { slug: "uk", name: "United Kingdom", shortText: "Short master's and Graduate Route opportunities.", longText: "The UK is known for high-quality education, one-year master's options, and strong career outcomes. We support your full journey from university shortlist to visa." },
  { slug: "usa", name: "United States", shortText: "Top programs with STEM OPT pathways.", longText: "The USA provides diverse universities, flexible academics, and research-led programs. We guide you on profile building, admission strategy, and visa preparation." },
  { slug: "canada", name: "Canada", shortText: "Quality education with PR-focused pathways.", longText: "Canada remains one of the most student-friendly destinations with excellent education and work opportunities. We help you select programs aligned with long-term plans." },
  { slug: "ireland", name: "Ireland", shortText: "A growing tech hub for international students.", longText: "Ireland is a strong choice for IT, business, and health-related studies. We help you evaluate course outcomes, cost, and career potential." },
  { slug: "malta", name: "Malta", shortText: "Affordable European option with English instruction.", longText: "Malta offers English-taught programs in a safe, welcoming environment. We help you compare options and build a practical application plan." },
  { slug: "germany", name: "Germany", shortText: "Excellent technical education with low tuition options.", longText: "Germany is popular for engineering, technology, and research pathways. We help with admission, documentation, and visa guidance." },
  { slug: "new-zealand", name: "New Zealand", shortText: "Balanced lifestyle and post-study opportunities.", longText: "New Zealand offers quality education and a supportive environment for international students. We help you choose suitable institutions and visa pathways." },
  { slug: "dubai", name: "Dubai", shortText: "International campuses and modern student lifestyle.", longText: "Dubai provides global education options close to home, with strong industry exposure. We support your selection and documentation process end-to-end." },
  { slug: "georgia", name: "Georgia", shortText: "Budget-friendly destination for selected programs.", longText: "Georgia is an emerging destination for cost-effective international study. We help you assess program quality, affordability, and future opportunities." },
];

const defaultBlogs = [
  {
    slug: "affordable-uk-universities",
    title: "Affordable UK Universities with Tuition Fees Below £10,000",
    excerpt: "Top UK university options for cost-conscious international students.",
    category: "UK",
    readTime: "5 min",
    tags: JSON.stringify(["UK", "Tuition", "Affordable"]),
    content:
      "The UK remains a leading study destination for many students. If budget is a concern, there are still excellent institutions with lower tuition fees. In this guide, we explain how to shortlist affordable universities, evaluate course value, and prepare a strong application.",
  },
  {
    slug: "study-abroad-without-ielts",
    title: "Can You Study Abroad Without IELTS or PTE?",
    excerpt: "Alternative language proof options for selected universities and countries.",
    category: "General",
    readTime: "6 min",
    tags: JSON.stringify(["IELTS", "PTE", "English"]),
    content:
      "Some universities accept alternatives to IELTS/PTE such as MOI letters, Duolingo, or internal assessments. Requirements vary by institution and course. We recommend verifying accepted proofs before applying and preparing a backup test option.",
  },
  {
    slug: "canada-study-permit-guide",
    title: "Canada Study Permit: Complete Application Guide",
    excerpt: "A practical breakdown of documents, timelines, and common errors.",
    category: "Canada",
    readTime: "7 min",
    tags: JSON.stringify(["Canada", "Visa", "Study Permit"]),
    content:
      "A successful Canada study permit application depends on documentation quality and a clear study plan. In this article, we cover mandatory paperwork, realistic timelines, and how to reduce refusal risk.",
  },
];

const defaultVideoTestimonials = [
  {
    name: "Dipesh's Father",
    role: "Parents Testimonial",
    caption: "Watch what Dipesh's father has to say",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tag: "Parent",
  },
  {
    name: "Dipesh Rijal",
    role: "Student",
    caption: "Watch what Dipesh Rijal has to say",
    thumbnail: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
    tag: "Student",
  },
  {
    name: "Prasis Kandel",
    role: "Student",
    caption: "Watch what Prasis Kandel has to say",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    tag: "Student",
  },
  {
    name: "Sita Sharma",
    role: "Parent",
    caption: "Watch what Sita Sharma has to say",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
    tag: "Parent",
  },
];

export async function ensureContentTables() {
  if (!initPromise) {
    initPromise = (async () => {
      const pool = getPool();

      await pool.query(`
        CREATE TABLE IF NOT EXISTS AboutCeo (
          id INT NOT NULL AUTO_INCREMENT,
          singletonKey VARCHAR(40) NOT NULL DEFAULT 'default',
          ceoName VARCHAR(191) NOT NULL,
          designation VARCHAR(191) NOT NULL,
          message TEXT NOT NULL,
          profileImage LONGTEXT NULL,
          linkedinUrl VARCHAR(500) NULL,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uniq_about_ceo_singleton (singletonKey)
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS StaffProfile (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(191) NOT NULL,
          designation VARCHAR(191) NOT NULL,
          image LONGTEXT NULL,
          socialUrl VARCHAR(500) NULL,
          displayOrder INT NOT NULL DEFAULT 0,
          isActive BOOLEAN NOT NULL DEFAULT true,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS BlogPost (
          id INT NOT NULL AUTO_INCREMENT,
          slug VARCHAR(191) NOT NULL,
          title VARCHAR(255) NOT NULL,
          excerpt TEXT NULL,
          content LONGTEXT NOT NULL,
          category VARCHAR(100) NULL,
          readTime VARCHAR(40) NULL,
          thumbnail LONGTEXT NULL,
          videoUrl VARCHAR(1200) NULL,
          tags TEXT NULL,
          isPublished BOOLEAN NOT NULL DEFAULT true,
          publishedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uniq_blog_slug (slug)
        )
      `);

      await pool.query(`
  CREATE TABLE IF NOT EXISTS DestinationContent (
    id INT NOT NULL AUTO_INCREMENT,
    slug VARCHAR(191) NOT NULL,
    name VARCHAR(191) NOT NULL,
    shortText TEXT NULL,
    long_description LONGTEXT NULL,
    isActive BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uniq_destination_slug (slug)
  )
`);

      // Backward-compatible column migration for older schema variants.
      const [destinationColumns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM DestinationContent");
      const hasLongDescription = destinationColumns.some((col) => col.Field === "long_description");
      const hasLongText = destinationColumns.some((col) => col.Field === "longText");

      if (!hasLongDescription) {
        await pool.query("ALTER TABLE DestinationContent ADD COLUMN long_description LONGTEXT NULL");
      }

      if (hasLongText) {
        await pool.query(
          "UPDATE DestinationContent SET long_description = COALESCE(long_description, longText) WHERE longText IS NOT NULL",
        );
      }

      // Ensure image fields can store base64 data URLs from gallery uploads.
      const [aboutColumns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM AboutCeo");
      const aboutProfileImage = aboutColumns.find((col) => col.Field === "profileImage");
      if (aboutProfileImage && typeof aboutProfileImage.Type === "string" && !aboutProfileImage.Type.includes("longtext")) {
        await pool.query("ALTER TABLE AboutCeo MODIFY COLUMN profileImage LONGTEXT NULL");
      }

      const [staffColumns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM StaffProfile");
      const staffImage = staffColumns.find((col) => col.Field === "image");
      if (staffImage && typeof staffImage.Type === "string" && !staffImage.Type.includes("longtext")) {
        await pool.query("ALTER TABLE StaffProfile MODIFY COLUMN image LONGTEXT NULL");
      }

      const [blogColumns] = await pool.query<RowDataPacket[]>("SHOW COLUMNS FROM BlogPost");
      const blogThumbnail = blogColumns.find((col) => col.Field === "thumbnail");
      const hasBlogVideoUrl = blogColumns.some((col) => col.Field === "videoUrl");
      if (blogThumbnail && typeof blogThumbnail.Type === "string" && !blogThumbnail.Type.includes("longtext")) {
        await pool.query("ALTER TABLE BlogPost MODIFY COLUMN thumbnail LONGTEXT NULL");
      }
      if (!hasBlogVideoUrl) {
        await pool.query("ALTER TABLE BlogPost ADD COLUMN videoUrl VARCHAR(1200) NULL");
      }

      await pool.query(`
        CREATE TABLE IF NOT EXISTS ContactRequest (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(191) NOT NULL,
          email VARCHAR(191) NOT NULL,
          phone VARCHAR(50) NULL,
          preferredTime VARCHAR(50) NULL,
          subject VARCHAR(191) NULL,
          message TEXT NULL,
          status VARCHAR(40) NOT NULL DEFAULT 'new',
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS ConsultationRequest (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(191) NOT NULL,
          email VARCHAR(191) NOT NULL,
          phone VARCHAR(50) NULL,
          nationality VARCHAR(100) NULL,
          studyDestination VARCHAR(191) NULL,
          studyLevel VARCHAR(191) NULL,
          fieldOfStudy VARCHAR(191) NULL,
          goals TEXT NULL,
          challenges TEXT NULL,
          preferredDate VARCHAR(40) NULL,
          preferredTime VARCHAR(40) NULL,
          consultationType VARCHAR(40) NULL,
          additionalInfo TEXT NULL,
          status VARCHAR(40) NOT NULL DEFAULT 'new',
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS SiteSetting (
          id INT NOT NULL AUTO_INCREMENT,
          singletonKey VARCHAR(40) NOT NULL DEFAULT 'default',
          showUniversityTab BOOLEAN NOT NULL DEFAULT true,
          homeShowFindUni BOOLEAN NOT NULL DEFAULT true,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id),
          UNIQUE KEY uniq_site_setting_singleton (singletonKey)
        )
      `);

      await pool.query(`
        CREATE TABLE IF NOT EXISTS VideoTestimonial (
          id INT NOT NULL AUTO_INCREMENT,
          name VARCHAR(191) NOT NULL,
          role VARCHAR(191) NULL,
          caption TEXT NULL,
          thumbnail LONGTEXT NULL,
          videoUrl VARCHAR(1200) NOT NULL,
          tag VARCHAR(80) NULL,
          displayOrder INT NOT NULL DEFAULT 0,
          isActive BOOLEAN NOT NULL DEFAULT true,
          createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          PRIMARY KEY (id)
        )
      `);

      await pool.query(
        `INSERT IGNORE INTO AboutCeo (singletonKey, ceoName, designation, message, profileImage, linkedinUrl)
         VALUES ('default', ?, ?, ?, ?, ?)`,
        [
          "Dinesh Dhakal",
          "CEO & Founder",
          "At StudySync Educare, we believe every dream deserves the right direction. Our team is committed to helping students build a confident international education journey from planning to arrival.",
          "",
          "",
        ],
      );

      await pool.query(
        `INSERT IGNORE INTO SiteSetting (singletonKey, showUniversityTab, homeShowFindUni)
         VALUES ('default', true, true)`,
      );

      for (const destination of defaultDestinations) {
        await pool.query(
          `INSERT IGNORE INTO DestinationContent (slug, name, shortText, long_description, isActive)
           VALUES (?, ?, ?, ?, true)`,
          [destination.slug, destination.name, destination.shortText, destination.longText],
        );
      }

      for (const blog of defaultBlogs) {
        await pool.query(
          `INSERT IGNORE INTO BlogPost (slug, title, excerpt, content, category, readTime, tags, isPublished)
           VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
          [blog.slug, blog.title, blog.excerpt, blog.content, blog.category, blog.readTime, blog.tags],
        );
      }

      for (let index = 0; index < defaultVideoTestimonials.length; index += 1) {
        const video = defaultVideoTestimonials[index];
        await pool.query(
          `INSERT IGNORE INTO VideoTestimonial (name, role, caption, thumbnail, videoUrl, tag, displayOrder, isActive)
           VALUES (?, ?, ?, ?, ?, ?, ?, true)`,
          [video.name, video.role, video.caption, video.thumbnail, video.videoUrl, video.tag, index],
        );
      }
    })();
  }

  try {
    await initPromise;
  } catch (error) {
    // Allow retry in future requests if init failed once.
    initPromise = null;
    throw error;
  }
}
