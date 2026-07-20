#1--- Docs


1.4-- typescripts
- js -> khong rang buoc kieu du lieu
- ts -> code nhanh do da co kieu du lieu, ho tro . goi y
- ts -> js, .scss -> css
- type trong ts -> de bao tri, phat trien, phat hien loi som

--
const totalSum = (a:number, b:number): number => {
    return a + b
}

type TSkill = {
    skill: string
}

interface TPerson extends TSkill = {
    name: string
    age?: number
}
const person:TPerson = {
    name: '12',
    skill: "JS"
}
person = {name: "", age: 30}
person.name

-- react typescripts
const Ap:FC = () => {
    const [count, setCount] = useState<string | number>(1)
    const refInput = useRef<null | HTMLInputElement>(null)
}

-> Content.tsx
interface TProps {
    count: number
    handleIncrease: () => void
}

const Content: FC<TProps> = ({count, handleIncrease}) => {
    return ()
}
export default Content


1.5-- nextjs
1.6-- blog
1.7-- setup
1.8-- api auth
1.9-- login,logout, permision
1.10-- authorization
1.11-- permision user
1.12-- user manage
1.13-- setup manage
1.14-- product manage


#2--- install
cd proj1_2
cd create-react-tutorial
npm install @types/react @types/react-dom

#3--- generate


#4--- run


#5--- ci/cd


#6--- docker


#7--- deploy