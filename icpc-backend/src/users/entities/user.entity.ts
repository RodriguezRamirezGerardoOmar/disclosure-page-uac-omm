import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base.entity';
import { Role } from '../../roles/entities/role.entity';
import { ShoppingCart } from '../../shopping-cart/entities/shopping-cart.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;
  user: Role[];

  @OneToMany(() => ShoppingCart, shoppingCart => shoppingCart.user)
  shoppingCart: ShoppingCart[];

  @OneToMany(() => Order, order => order.user)
  order: Order[];
}
