import { Prescription } from "../../shared/models/prescription"
import { Symptoms } from "../../shared/models/symptoms"
import { Test } from "../../shared/models/test"
import { Vitals } from "../../shared/models/vitals"
import { RecommendedDoctor } from "./recommendedDoctor"

export class AppointmentReport {
    reportId: number = 0
    prescriptions: Prescription[] = []
    vitals: Vitals = new Vitals()
    tests: Test[] = []
    symptoms: Symptoms[] = []
    recommendedDoctors: RecommendedDoctor[] = []
    comments: string = ''
}