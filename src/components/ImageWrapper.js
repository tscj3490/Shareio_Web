import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

/**
 * Image Wrapper to keep image's ratio
 * @param {*} props
 * @returns
 */
const ImageWrapper = (props) => {
	const { src, alt, className, hasMargin, ...restProps } = props;

	const imgWrapper = useRef();

	const [imageType, setImageType] = useState("");

	useEffect(() => {
		const img = imgWrapper.current;

		if (img) {
			img.onload = function () {
				if (img.height > img.width) {
					img.classList.add("height");
					setImageType("vertical");
				} else if (img.height < img.width) {
					setImageType("horizontal");
				}
			};
		}

		return () => {};
	}, []);

	return (
		<Wrapper
			className={`${className || ""} ${imageType} ${hasMargin ? "margin" : ""}`}
			{...restProps}
		>
			<img src={src} alt={alt || ""} ref={imgWrapper} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	align-items: center;
	justify-content: center;
	display: flex;
	width: 100%;
	height: 100%;

	&.margin {
		&.horizontal {
			padding: 0 14px;
		}

		&.vertical {
			padding: 14px 0;
		}
	}

	img {
		width: 100%;
		height: auto;
		object-fit: contain;
		max-height: 100%;
		max-width: 100%;

		&.height {
			width: auto;
			height: 100%;
		}
	}
`;

export default ImageWrapper;
