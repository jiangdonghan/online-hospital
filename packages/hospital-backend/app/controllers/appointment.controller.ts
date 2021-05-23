import {
  Body,
  Get,
  HttpError,
  JsonController,
  Param,
  Params,
  Post,
  Put,
} from 'routing-controllers'
import { Appointment } from '../entities'
import { AppointmentService, AppointmentStatus, PrescriptionModel } from '../services'
import { Role } from '../../../common/model'
import { now } from 'moment'

@JsonController()
export class AppointmentController {
  constructor() {}

  @Post('/appointment')
  async createAppointment(@Body() params: { doctorId: number; patientId: number }) {
    const existedAppointment = await Appointment.findOne({
      where: {
        doctorId: params.doctorId,
        patientId: params.patientId,
        status: AppointmentStatus.NotStarted,
      },
    })
    if (existedAppointment) {
      throw new HttpError(400, 'You have already booked this doctor')
    }
    const appointment = new Appointment()
    appointment.doctorId = params.doctorId
    appointment.patientId = params.patientId
    appointment.status = AppointmentStatus.NotStarted
    appointment.startTs = now().toString()
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

  @Post('/appointment/:id/cancel')
  async cancelAppointment(@Param('id') id: number) {
    const existedAppointment = await Appointment.findOne(id)
    existedAppointment.status = AppointmentStatus.Cancelled
    await existedAppointment.save()
    return 'success'
  }

  @Put('/appointment/:appointmentId/prescription')
  async savePrescription(
    @Param('appointmentId') appointmentId: number,
    @Body() params: PrescriptionModel,
  ) {
    const appointment = await Appointment.findOne(appointmentId)
    return await appointment.savePrescription(params)
  }

  @Get('/appointment/:appointmentId/prescription')
  async getPrescription(@Param('appointmentId') id: number) {
    const appointment = await Appointment.findOne(id)
    return await appointment.preparePrescription()
  }
}
