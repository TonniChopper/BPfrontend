import '../Styles/Footer.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-5 p-8">
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h5 className="text-lg font-bold mb-4">About Us</h5>
                    <p className="text-gray-300">
                        WebPyAnsys is a leading provider of simulation software solutions.
                    </p>
                </div>
                <div>
                    <h5 className="text-lg font-bold mb-4">Quick Links</h5>
                    <ul className="space-y-2">
                        <li>
                            <a href="#home" className="text-white hover:text-yellow-500">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#simulation1" className="text-white hover:text-yellow-500">
                                Simulation 1
                            </a>
                        </li>
                        <li>
                            <a href="#simulation2" className="text-white hover:text-yellow-500">
                                Simulation 2
                            </a>
                        </li>
                        <li>
                            <a href="#simulation3" className="text-white hover:text-yellow-500">
                                Simulation 3
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="text-lg font-bold mb-4">Contact Us</h5>
                    <ul className="space-y-2 text-gray-300">
                        <li>Email: info@webpyansys.com</li>
                        <li>Phone: +123 456 7890</li>
                        <li>Address: 123 Simulation St, Tech City</li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 text-center border-t border-gray-700 pt-4">
                <p>&copy; 2023 WebPyAnsys. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;