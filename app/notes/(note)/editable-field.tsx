'use client';

import isEmpty from "lodash/isEmpty";
import { useState } from "react";

export default function EditableField({ className, value, placeholder, onChange }: any) {
    const [content, setContent] = useState(value);
  
    return (
      <div 
        className={className} 
        contentEditable="true" 
        onChange={onChange ?? null}>
        {!isEmpty(value) ? value : placeholder}
      </div>
    );
  }
  