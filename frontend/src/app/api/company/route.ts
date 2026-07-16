import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { company } = await request.json();

    const response = await fetch(
      `https://api.thecompaniesapi.com/v2/companies/by-name?name=${encodeURIComponent(company)}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.COMPANIES_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Companies API returned ${response.status}`);
    }

const data = await response.json();

const companyData = data.companies?.[0];
console.log("Matched company:", companyData);

if (!companyData) {
  throw new Error("Company not found");
}

const mappedCompany = {
  name: companyData.name,

  industry:
    companyData.about?.industry ??
    companyData.about?.industries?.[0] ??
    "Technology",

location:
  companyData.locations?.headquarters?.city?.name ??
  companyData.locations?.headquarters?.state?.name ??
  "Unknown",

  employees:
    companyData.totalEmployeesExact ??
    companyData.totalEmployees ??
    0,

  contact: "VP Engineering",

  signals: {
    openJobs: 0,
    oldJobs: 0,
    funding: false,
    hiringGrowth: 0,
    noTalentLeader: true,
  },
};

return NextResponse.json({
  success: true,
  company: mappedCompany,
});

  } catch (error: any) {
    console.error("Company API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}