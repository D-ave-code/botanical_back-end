export class CreateBillsDto {
  f_compra?: Date;
  tipo_compra?: string;
  precio?: number;
  total?: number;
  descuento?: number;
  apodo?: string

  //campos relaciones
  plantsId?: number;
  usersId?: number;
  plansId?: number;
  zonesId?: number;
  managersId?: number
}
