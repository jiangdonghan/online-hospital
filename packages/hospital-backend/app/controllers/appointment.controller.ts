import { Body, Get, JsonController, Post, QueryParams } from 'routing-controllers'
import { Appointment } from '../entities/appointment.entity'

@JsonController()
export class AppointmentController {
  constructor() {}
  @Post('/appointment')
  async createAppointment(@Body() params: { doctorId: number; patientId: number }) {
    const appointment = new Appointment()
    appointment.doctorId = params.doctorId
    appointment.patientId = params.patientId
    await appointment.save()
  }
}
