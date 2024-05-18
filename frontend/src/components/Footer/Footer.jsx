import { Footer } from "flowbite-react";

const Footers = () => {
  return (
    <>
     <Footer container>
      <Footer.Copyright href="#" by="User™" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">Profile</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
      
    </>
  )
}

export default Footers
