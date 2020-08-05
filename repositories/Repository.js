import SaleRepository from './SaleRepository'
import EmployeeRepository from './EmployeeRepository'

export default () => ({
  sale: SaleRepository(),
  employee: EmployeeRepository(),
})