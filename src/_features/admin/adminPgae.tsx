import { Container } from "@/components/AdminWeb/container"
import { Navigation } from "@/components/AdminWeb/Navigation/Navigation"


export const AdminPage = () => {
    
    return (
        <>
        <div className="flex">
        <Navigation></Navigation>
        <Container></Container>
        </div>
        </>
    )
}