import {
  ServiceCategory,
  ItemCategory,
  Payment,
  Status,
  Role,
  Day,
} from 'types/enums'

export type OrderInfo = {
  count: number
  price: number
}

export type User = {
  id: string
  email: string
  role: Role
}

export type AuthPayload = {
  user: User
  token: string
}

export type Item = {
  id: string
  name: string
  description?: string
  picture?: string
  price: number
  weight?: number
  time?: number
  categories: ItemCategory[]
  service: Service
  orderItems: OrderItem[]
}

export type Customer = {
  id: string
  email: string
  password: string
  firstName: string
  lastName: string
  payment: Payment
  phone?: string
  address?: Address
  cart?: Order
  orders: Order[]
  favorites: Service[]
  ratings: Rating[]
}

export type Service = {
  id: string
  email: string
  password: string
  name: string
  description?: string
  picture?: string
  phone?: string
  web?: string
  category: ServiceCategory
  openingHours: OpeningHour[]
  orders: Order[]
  ratings: Rating[]
  menu: Item[]
  address?: Address
  customers: boolean
}

export type Address = {
  id: string
  customer?: Customer
  service?: Service
  country?: string
  city?: string
  street?: string
  postalCode?: string
}

export type Order = {
  id: string
  service?: Service
  items: OrderItem[]
  customer?: Customer
  owner?: Customer
  payment: Payment
  status: Status
  completedAt?: string
  createdAt: string
  total: OrderInfo // added
}

export type OrderItem = {
  id: string
  amount: number
  item: Item
  order: Order
  total: number // added
}

export type Rating = {
  value: number
  customer: Customer
  service: Service
}

export type OpeningHour = {
  id: string
  day: Day
  from: string
  to: string
  service?: Service
}
