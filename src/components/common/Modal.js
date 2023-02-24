import { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
//scale,rotate,x,y로만 줄 수 있음

// 모달을 forwareRef로 감싸서 자기자신을 통째로 부모한테로 전달
//모달컴포넌트 자체를 부모로 전달
//forwardRef에 함수를 호출해서 통째로 함수의 인수값으로 콜백함수에 집어넣기
//1. forwardRef함수호출
//2. 잘라내기한 함수를 인수로 통째로 집어넣기
//3. 파라미터 값은 첫번째 = 부모한테 전달되는 값 props
//4. 두번째 파라미터로 참조할 수 있는 객체 전달
const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	//모달을 여는 setOpen이라는 객체로 state변경함수를 부모 컴포넌트로 전달
	useImperativeHandle(ref, () => {
		//무조건 객채로 반환해야되는데 반환되는 객체가 ref에 담겨서 부모에게 반환
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
