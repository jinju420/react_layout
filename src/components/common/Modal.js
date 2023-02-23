import { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
//scale,rotate,x,y로만 줄 수 있음

const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	//모달을 여는 setOpen이라는 객체로 state변경함수를 부모 컴포넌트로 전달
	useImperativeHandle(ref, () => {
		//객체 키값으로 전달해준
		return { setOpen: () => setOpen(true) };
	});

	useEffect(() => {
		Open ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [Open]);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, scale: 0, rotate: 0 }}
					animate={{ opacity: 1, scale: 1, rotate: 360, transition: { duration: 0.5 } }}
					exit={{ opacity: 0, scale: 0, rotate: 0, transition: { duration: 0.3 } }}
				>
					<motion.div
						className='con'
						id='pic'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.5 } }}
						exit={{ opacity: 0 }}
					>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ x: 100, opacity: 0 }}
						animate={{ x: 0, opacity: 1, transition: { delay: 0.6 } }}
						exit={{ x: 100, opacity: 0 }}
					>
						<FontAwesomeIcon icon={faCircleXmark} />
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});
export default Modal;
