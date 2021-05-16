import { Body, Get, JsonController, Params, Post } from 'routing-controllers'
import { Appointment } from '../entities'
import { AppointmentService, AppointmentStatus } from '../services'
import { Role } from '../../../common/model'

@JsonController()
export class AppointmentController {
  constructor() {}

  @Post('/appointment')
  async createAppointment(@Body() params: { doctorId: number; patientId: number }) {
    const appointment = new Appointment()
    appointment.doctorId = params.doctorId
    appointment.patientId = params.patientId
    appointment.status = AppointmentStatus.NotStarted
    await appointment.save()
  }

  @Get('/appointments/upcoming/role/:role/userId/:userId')
  async getUpcomingAppointments(
    @Params() { userId, role }: { userId: number; role: Role },
  ) {
    const appointmentService = new AppointmentService(role)
    return await appointmentService.getAppointments(userId, AppointmentStatus.NotStarted)
  }

  @Get('/appointments/history/role/:role/userId/:userId')
  async getHistoryAppointments(
    @Params() { userId, role }: { userId: number; role: Role },
  ) {
    const appointmentService = new AppointmentService(role)
    return await appointmentService.getAppointments(userId, AppointmentStatus.Finished)
  }
}
