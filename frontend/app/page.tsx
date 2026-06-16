import Header from "./global/components/Header";
import Form from "./(features)/authentication/components/Form";

export default function Home() {
  return (
    <>
    <Header
    title="Login"/>
    <main>
      <Form />
    </main>
   </>
  );
}
