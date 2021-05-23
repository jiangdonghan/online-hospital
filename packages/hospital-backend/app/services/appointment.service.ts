import { Service } from 'typedi'
import { Appointment, Doctor, Patient } from 'app/entities'
import { getRepository, Repository } from 'typeorm'
import { Role } from '../../../common/model'

export enum AppointmentStatus {
  NotStarted,
  Ongoing,
  Finished,
  Cancelled,
}

export interface PrescriptionModel {
  symptom: string
  advice: string
  diagnosis: string
}

@Service()
export class AppointmentService {
  repository: Repository<Appointment>
  role: Role

  constructor(role: Role = Role.DOCTOR) {
    this.repository = getRepository(Appointment)
    this.role = role
  }

  public async getAppointments(id: number, status: AppointmentStatus) {
    let result
    if (this.role === Role.DOCTOR) {
      result = await this.repository.findAndCount({
        where: { doctorId: id, status: status },
      })
    } else if (this.role === Role.PATIENT) {
      result = await this.repository.findAndCount({
        where: { patientId: id, status: status },
      })
    }
    const data = result[0]
    const appointments = []
    const count = result[1]
    for (let item of data) {
      const doctor = await Doctor.findOne(item.doctorId, { relations: ['doctorInfo'] })
      const patient = await Patient.findOne(item.patientId)
      appointments.push({
        doctorName: doctor.name,
        patientName: patient.name,
        specialist: doctor.doctorInfo.specialty1,
        ...item,
      })
    }
    return { elements: appointments, count: count }
  }

  public static async savePrescription(appointmentId: number, params: PrescriptionModel) {
    const appointment = await Appointment.findOne(appointmentId)
  }
}
