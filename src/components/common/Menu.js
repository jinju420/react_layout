import { forwardRef, useState, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Link, NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

const Menu = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { setToggle: () => setOpen(!Open) };
	});
	return (
		<>
			{Open && (
				<nav>
					<h1>Obj</h1>
				</nav>
			)}
		</>
	);
});

export default Menu;
