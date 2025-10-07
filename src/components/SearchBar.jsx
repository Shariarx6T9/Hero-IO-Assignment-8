import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search apps..."
      style={{ padding:10, borderRadius:10, border:'1px solid #e6e9ef', minWidth:220 }}
    />
  );
}
