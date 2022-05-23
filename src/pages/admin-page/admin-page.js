import { AppBar } from "../../components/app-bar/app-bar";
import { PoemsList } from "../../components/poems-list/poems-list";
import Container from '@mui/material/Container';


export function AdminPage() {
  return (
    <Container maxWidth="md">
      <AppBar />
      <PoemsList />
    </Container>
  )
}
