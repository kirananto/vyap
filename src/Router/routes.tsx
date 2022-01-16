import { lazily } from 'react-lazily'
const { Home } = lazily(() => import('src/Pages/Home/Home'))
const Login = lazily(() => import('src/Pages/Login/Login')).default
const SignupStepOne = lazily(() => import('src/Pages/Signup/SignupStepOne')).default
const SignupStepThree = lazily(() => import('src/Pages/Signup/SignupStepTwo')).default
const SignupStepFour = lazily(() => import('src/Pages/Signup/SignupStepThree')).default
const SignupStepFive = lazily(() => import('src/Pages/Signup/SignupStepFour')).default

const Settings = lazily(() => import('src/Pages/Settings/Settings')).default
const PaymentDetails = lazily(() => import('src/Pages/ChatView/PaymentDetails')).default
const Reports = lazily(() => import('src/Pages/Reports/Reports')).default
const Employees = lazily(() => import('src/Pages/Employees/Employees')).default
const StockManagement = lazily(() => import('src/Pages/StockManagement/StockManagement')).default
const More = lazily(() => import('src/Pages/More/More')).default
const Orders = lazily(() => import('src/Pages/Orders')).default
const Product = lazily(() => import('src/Pages/Product')).default
const Account = lazily(() => import('src/Pages/Account')).default
const AllPayments = lazily(() => import('src/Pages/Payments')).default

const AddItem = lazily(() => import('src/Pages/ChatView/PlaceOrder/AddItem')).default
const PlaceOrder = lazily(() => import('src/Pages/ChatView/PlaceOrder')).default
const CreateProduct = lazily(() => import('src/Pages/Product/AddProduct/ProductScreen/CreateProduct')).default
const AddEditPurchase = lazily(() => import('src/Pages/StockManagement/PurchaseOrder/AddEditPurchase')).default
const PurchaseOrder = lazily(() => import('src/Pages/StockManagement/PurchaseOrder')).default
const AddProductMain = lazily(() => import('src/Pages/Product/AddProduct/MainScreen/AddProductMain')).default
const OrderDetails = lazily(() => import('src/Pages/Orders/OrderView')).default
const { Payment } = lazily(() => import('src/Pages/ChatView'))

export const routes: {
    path: string;
    Component: () => JSX.Element;
    requireAuth: boolean;
}[] = [
    {
        path: '/',
        Component: Home,
        requireAuth: true
    },
    {
        path: '/home',
        Component: Home,
        requireAuth: true
    },
    {
        path: '/login',
        Component: Login,
        requireAuth: false
    },
    {
        path: '/signup',
        Component: SignupStepOne,
        requireAuth: false
    },
    {
        path: '/signup-step-2',
        Component: SignupStepThree,
        requireAuth: false
    },
    {
        path: '/signup-step-3',
        Component: SignupStepFour,
        requireAuth: false
    },
    {
        path: '/signup-step-4',
        Component: SignupStepFive,
        requireAuth: false
    },
    {
        path: '/payment/:id',
        Component: PaymentDetails,
        requireAuth: true
    },
    {
        path: '/reports',
        Component: Reports,
        requireAuth: true
    },
    {
        path: '/employees',
        Component: Employees,
        requireAuth: true
    },
    {
        path: '/stock-management',
        Component: StockManagement,
        requireAuth: true
    },
    {
        path: '/my-products',
        Component: Product,
        requireAuth: true
    },
    {
        path: '/settings',
        Component: Settings,
        requireAuth: true
    },
    {
        path: '/more',
        Component: More,
        requireAuth: true
    },
    {
        path: '/orders',
        Component: Orders,
        requireAuth: true
    },
    {
        path: '/my-account',
        Component: Account,
        requireAuth: true
    },
    {
        path: '/all-payments',
        Component: AllPayments,
        requireAuth: true
    },
    {
        path: '/chat/:id',
        Component: Payment,
        requireAuth: true
    },
    {
        path: '/add-product',
        Component: AddProductMain,
        requireAuth: true
    },
    {
        path: '/create-product',
        Component: CreateProduct,
        requireAuth: true
    },
    {
        path: '/edit-product',
        Component: CreateProduct,
        requireAuth: true
    },
    {
        path: '/purchase-order',
        Component: PurchaseOrder,
        requireAuth: true
    },
    {
        path: '/purchase-order/new',
        Component: AddEditPurchase,
        requireAuth: true
    },
    {
        path: '/purchase-order/:id',
        Component: AddEditPurchase,
        requireAuth: true
    },
    {
        path: '/order/:id',
        Component: OrderDetails,
        requireAuth: true
    },
    {
        path: '/place-order',
        Component: PlaceOrder,
        requireAuth: true
    },
    {
        path: '/place-order/add-item',
        Component: AddItem,
        requireAuth: true
    }
]