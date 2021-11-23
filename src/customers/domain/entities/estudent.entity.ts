import { CustomerId } from '../value-objects/customer-id.value';
import { Dni } from '../value-objects/dni.value';
import { EstudentName } from '../../../common/domain/value-objects/estudent-name.value';
import { AuditTrail } from '../../../common/domain/value-objects/audit-trail.value';
import { Customer } from './customer.entity';
import { CustomerType } from '../enums/customer-type.enum';
import { EstudentRegistered } from '../events/estudent-registered.event';

export class Estudent extends Customer {
  private name: EstudentName;
  private dni: Dni;

  public constructor(name: EstudentName, dni: Dni, auditTrail: AuditTrail) {
    super(CustomerType.ESTUDENT, auditTrail);
    this.name = name;
    this.dni = dni;
  }

  public register() {
    const event = new EstudentRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

  public getId(): CustomerId {
    return this.id;
  }

  public getName(): EstudentName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public getAuditTrail(): AuditTrail {
    return this.auditTrail;
  }

  public changeName(name: EstudentName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}
