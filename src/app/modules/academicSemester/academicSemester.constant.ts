import {
  TAcademicSemesterNameCodeMapper,
  TAcademicSemesterCodes,
  TAcademicSemesterNames,
  TMonths,
} from "./academicSemester.interface"

export const Months: TMonths[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
]

export const AcademicSemesterNames: TAcademicSemesterNames[] = [
  "autumn",
  "summer",
  "fall",
]

export const AcademicSemesterCodes: TAcademicSemesterCodes[] = [
  "01",
  "02",
  "03",
]

export const academicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
  autumn: "01",
  summer: "02",
  fall: "03",
}

export const AcademicSemesterSearchableFields = ["name", "year"]
