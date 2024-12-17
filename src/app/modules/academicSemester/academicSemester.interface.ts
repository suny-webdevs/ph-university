export type TMonths =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december"

export type TAcademicSemesterNames = "autumn" | "summer" | "fall"
export type TAcademicSemesterCodes = "01" | "02" | "03"

export interface IAcademicSemester {
  name: TAcademicSemesterNames
  code: TAcademicSemesterCodes
  year: string
  startMonth: TMonths
  endMonth: TMonths
}

export type TAcademicSemesterNameCodeMapper = {
  [key in TAcademicSemesterNames]: TAcademicSemesterCodes
}
