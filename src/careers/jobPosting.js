import { ORGANIZACION } from "../components/v4/Seo";

/**
 * JSON-LD `JobPosting` de schema.org para Google for Jobs
 * (developers.google.com/search/docs/appearance/structured-data/job-posting).
 * Recibe la ficha ya preparada en servidor.
 */

const JORNADAS = { full_time: "FULL_TIME", part_time: "PART_TIME", internship: "INTERN" };
const REMOTO = {
  jobLocationType: "TELECOMMUTE",
  applicantLocationRequirements: { "@type": "Country", name: "ES" },
};

export function jobPosting(ficha) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: ficha.title,
    description: ficha.descriptionHtml,
    datePosted: ficha.openedAt,
    hiringOrganization: ORGANIZACION,
    employmentType: JORNADAS[ficha.employmentType],
    directApply: true,
    ...(ficha.workMode === "remote" ? REMOTO : {}),
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: ficha.location || "Madrid",
        addressCountry: "ES",
      },
    },
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: ficha.salaryCurrency,
      value: {
        "@type": "QuantitativeValue",
        minValue: ficha.salaryMin,
        maxValue: ficha.salaryMax,
        unitText: "YEAR",
      },
    },
  };
}
