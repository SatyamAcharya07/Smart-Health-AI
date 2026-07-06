/**
 * The one recurring visual signature of this app: a chart-monitor
 * pulse line. It isn't decorative — amplitude and speed are driven
 * by `intensity` (0 to 1), meant to reflect real system load such as
 * bed occupancy or the share of medicines flagged low/critical.
 */
export default function PulseStrip({ intensity = 0.4, tone = 'primary', label }) {
  const color = `var(--${tone})`
  const duration = Math.max(2.4, 5.5 - intensity * 3.2).toFixed(2)
  const scaleY = (0.35 + intensity * 1.15).toFixed(2)

  // one ECG-like segment, repeated twice back to back and scrolled
  const segment = 'M0,20 L18,20 L24,20 L30,4 L36,34 L42,10 L48,20 L64,20 L120,20'

  return (
    <div className="pulse-strip" role="img" aria-label={label || 'system pulse indicator'}>
      {label && <span className="pulse-label">{label}</span>}
      <svg
        className="pulse-svg"
        viewBox="0 0 240 40"
        preserveAspectRatio="none"
        style={{ '--pulse-duration': `${duration}s` }}
      >
        <g className="pulse-track">
          <g style={{ transform: `scaleY(${scaleY})`, transformOrigin: '20px center' }}>
            <path d={segment} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <g
            style={{
              transform: `translateX(120px) scaleY(${scaleY})`,
              transformOrigin: '140px center',
            }}
          >
            <path d={segment} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
      </svg>
    </div>
  )
}
