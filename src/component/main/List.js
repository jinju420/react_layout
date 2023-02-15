import { NavLink } from 'react-router-dom';

function List() {
	return (
		<section id='list'>
			<div className='inner'>
				<div className='wrap'>
					<dl className='util'>
						<dt>
							<span>PRODUCTS</span>
						</dt>
						<dd>
							<article>1</article>
							<article>2</article>
							<article>3</article>
							<article>4</article>
							<article>5</article>
							<article>6</article>
							<article>7</article>
						</dd>
						<dt>
							<span>LIVING</span>
						</dt>
						<dd>
							<article>1</article>
							<article>2</article>
							<article>3</article>
							<article>4</article>
							<article>5</article>
							<article>6</article>
							<article>7</article>
						</dd>
						<dt>
							<span>MAGAZINE</span>
						</dt>
						<dd>
							<article>1</article>
							<article>2</article>
							<article>3</article>
							<article>4</article>
							<article>5</article>
							<article>6</article>
							<article>7</article>
						</dd>
					</dl>
				</div>
			</div>
		</section>
	);
}

export default List;
