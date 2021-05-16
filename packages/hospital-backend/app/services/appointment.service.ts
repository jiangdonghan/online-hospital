import { Service } from 'typedi'
import { Appointment, Doctor } from 'app/entities'
import { getRepository, Repository } from 'typeorm'
import { Role } from '../../../common/model'

export enum AppointmentStatus {
  NotStarted,
  Ongoing,
  Finished,
  Cancelled,
}

@Service()
export class AppointmentService {
  repository: Repository<Appointment>
  role: Role

  constructor(role: Role) {
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
      const repo = getRepository(Doctor)
      const result = await repo.findOne(item.doctorId, { relations: ['doctorInfo'] })
      appointments.push({
        name: result.name,
        specialist: result.doctorInfo.specialty1,
        ...item,
      })
    }
    return { elements: appointments, count: count }
  }
}
