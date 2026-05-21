"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Course = {
  id: number;
  slug: string;
  name: string;
  introText?: string;
  thumbnail?: string;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function loadCourses() {
      try {
        const res = await fetch("/api/popular-courses", { cache: "no-store" });
        const data = await res.json();
        if (!ignore && data?.success) setCourses(Array.isArray(data.courses) ? data.courses : []);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadCourses();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-[#c0392b] mb-2">Popular Courses</h1>
      <p className="text-gray-600 mb-8">Explore detailed course guides and pathways.</p>

      {loading ? <p className="text-gray-600">Loading courses...</p> : null}
      {!loading && !courses.length ? <p className="text-gray-600">No courses available.</p> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} className="block border rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden">
            {course.thumbnail ? <img src={course.thumbnail} alt={course.name} className="w-full h-44 object-cover" /> : null}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.name}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{course.introText || "Course details available."}</p>
              <span className="inline-block mt-4 text-[#c0392b] font-medium">Read Details →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
