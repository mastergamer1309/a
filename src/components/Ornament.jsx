/** Separador dorado con rombo central. */
export function Ornament({ className = '', ...rest }) {
  return (
    <div className={`orn ${className}`.trim()} aria-hidden="true" {...rest}>
      <i /><b /><i />
    </div>
  );
}
