import { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { tests } from "@/data/tests";
import { packages } from "@/data/packages";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/tests",
    "/packages",
    "/doctors",
    "/about",
    "/contact",
    "/book",
    "/reports",
    "/reference-values",
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));

  const testRoutes = tests.map((t) => ({
    url: `${siteConfig.url}/tests/${t.id}`,
    lastModified: new Date(),
  }));

  const packageRoutes = packages.map((p) => ({
    url: `${siteConfig.url}/packages/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...testRoutes, ...packageRoutes];
}
