import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <p>TechNest &copy; {currentYear}</p>
                        {/* simply using to get current year using bootstrap*/}
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};
export default Footer;