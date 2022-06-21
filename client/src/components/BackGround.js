import React, { useRef, useEffect  } from 'react';
import { Image, Transformer } from "react-konva";


function BackGround({image, isSelected, onSelect, onChange}) {
    const shapeRef = useRef();
    const trRef = useRef();

    useEffect(() => {
        if (isSelected) {
            // we need to attach transformer manually
            trRef.current.nodes([shapeRef.current]);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);


  return (
    <>
        <Image 
            image={image.image} 
            draggable
            onClick={onSelect}
            onTap={onSelect}
            ref={shapeRef}
            {...image}
            onDragEnd={(e) => {
                onChange({
                    ...image,
                    x: e.target.x(),
                    y: e.target.y()
                });
            }}
            onTransformEnd={(e) => {
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);
               onChange({
                ...image,
                x: node.x(),
                y: node.y(),
                width: Math.max(5, node.width() * scaleX),
                height: Math.max(5, node.height() * scaleY)
               });
            }} 
        />
        {isSelected && (
            <Transformer 
                ref={trRef}
                boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                }
                return newBox
                }}
            />
        )}
    </>
  )
}

export default BackGround