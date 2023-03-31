import { useState, forwardRef, useImperativeHandle } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { AnimatePresence, motion } from 'framer-motion';

const Detail = forwardRef((props, ref) => {
	const isMobile = useMediaQuery('(max-width: 789px)');
	const aniDetail = isMobile ? { init: { y: '-100%' } } : { init: { y: '100%' } };
	const aniPic = isMobile
		? { anim: { x: '0%', width: '100%', transition: { duration: 0.5, delay: 0.4 } } }
		: { anim: { x: '0%', width: '50%', transition: { duration: 0.5, delay: 0.4 } } };

	const [Open, setOpen] = useState(false);

	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});

	const closeDetail = () => {
		setOpen(false);
		props.listEl.current.classList.remove('off');
	};

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='detail'
					initial={aniDetail.init}
					animate={{ y: '0%', transition: { duration: 0.6 } }}
					exit={{ y: '-100%', transition: { duration: 0.5, delay: 0.7 } }}
				>
					<h1>GRANHAND.</h1>
					<motion.div
						className='txt'
						initial={{ x: '100%', opacity: 0 }}
						animate={{ x: '0%', opacity: 1, transition: { duration: 0.7, delay: 0.4 } }}
						exit={{ x: '-100%', opacity: 0, transition: { duration: 0.4, delay: 0.5 } }}
					>
						<h2 style={{ color: props.bg }}>{props.tit}</h2>
						<p>{props.con}</p>
					</motion.div>

					<motion.div
						style={{ backgroundColor: props.bg }}
						className='pic'
						initial={{ x: '-300%', width: '0%' }}
						animate={aniPic.anim}
						exit={{ y: '-100%', opacity: 0, transition: { duration: 0.4, delay: 0.3 } }}
					>
						<motion.div
							className='box'
							initial={{ x: '-200%', opacity: 0 }}
							animate={{ x: '0%', opacity: 1, transition: { duration: 0.8, delay: 0.7 } }}
							exit={{ x: '100%', opacity: 0, transition: { duration: 0.4 } }}
						>
							<img src={`${process.env.PUBLIC_URL}/img/${props.src}`} alt={props.tit} />
						</motion.div>
					</motion.div>

					<span className='close' onClick={closeDetail}>
						close
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Detail;
