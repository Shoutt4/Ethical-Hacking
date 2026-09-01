import { forwardRef, useEffect, useMemo, useRef, useState, useImperativeHandle } from 'react'
import Globe from 'react-globe.gl'
import { feature } from 'topojson-client'
import countriesTopology from 'world-atlas/countries-110m.json'
import type { GlobeInstance } from 'globe.gl'
import type { Partner } from '../lib/data'
import * as THREE from 'three'

interface PartnerGlobeProps {
  partners: Partner[]
  selectedId: string
  onSelect: (partner: Partner) => void
  resetToken: number
}

export interface PartnerGlobeHandle {
  focusPartner: (partner: Partner) => void
}

interface CountryFeature {
  id: string | number
  properties?: Record<string, unknown>
  geometry: object
}

const INITIAL_VIEW = {
  lat: 12,
  lng: -79,
  altitude: 1.85,
}

const PartnerGlobe = forwardRef<PartnerGlobeHandle, PartnerGlobeProps>(
  (
    {
      partners,
      selectedId,
      onSelect,
      resetToken,
    },
    ref
  ) => {
  const globeRef = useRef<GlobeInstance | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const [size, setSize] = useState({
    width: 720,
    height: 496,
  })

  // ==========================================
  // OBTENER PAÍSES DEL TOPOJSON
  // ==========================================

  const countries = useMemo(() => {
    const topology = countriesTopology as unknown as Parameters<typeof feature>[0]
    const collection = feature(topology, topology.objects.countries) as unknown as {
      features: CountryFeature[]
    }
    return collection.features
  }, [])

  const partnerForCountry = (country: CountryFeature | null) => {
    return country
      ? partners.find(partner => partner.geoId === String(country.id).padStart(3, '0'))
      : undefined
  }

  const focusPartner = (partner: Partner) => {
    globeRef.current?.pointOfView(
      { lat: partner.lat, lng: partner.lng, altitude: 0.72 },
      1100,
    )
    onSelect(partner)
  }

  useImperativeHandle(ref, () => ({
  focusPartner
}))

  // ==========================================
  // ESTILOS DE LOS LABELS DE OFICINAS
  // (columna + cajita con fuente mono de EHC)
  // ==========================================

  const officeStyles = useMemo(() => {
    const s = document.createElement('style')
    s.innerHTML = `
      .globe-office-marker {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
      }
      .office-box {
        background: #0D0D0D;
        border: 1px solid #7FCC27;
        padding: 5px 11px 6px;
        text-align: center;
        font-family: 'JetBrains Mono', 'Roboto Condensed', monospace;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        position: relative;
        white-space: nowrap;
      }
      .office-box::before,
      .office-box::after {
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border: 1px solid #7FCC27;
      }
      .office-box::before { top: -1px; left: -1px; border-right: 0; border-bottom: 0; }
      .office-box::after  { bottom: -1px; right: -1px; border-left: 0; border-top: 0; }
      .office-country {
        color: #7FCC27;
        font-size: 9px;
        font-weight: 700;
        letter-spacing: 0.18em;
      }
      .office-name {
        color: #EAEAEA;
        font-size: 11px;
        font-weight: 500;
        letter-spacing: 0.04em;
        margin-top: 2px;
      }
      .office-pointer {
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 7px solid #7FCC27;
        margin-top: 3px;
      }
    `
    document.head.appendChild(s)
    return s
  }, [])

  // ==========================================
  // RESET VIEW
  // ==========================================

  useEffect(() => {
    if (resetToken > 0) {
      globeRef.current?.pointOfView(INITIAL_VIEW, 900)
    }
  }, [resetToken])

  // ==========================================
  // RESPONSIVE SIZE
  // ==========================================

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const resize = () => {
      const width = node.clientWidth
      setSize({ width, height: Math.max(360, Math.min(496, width * 0.69)) })
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="partner-globe relative"
      aria-label="Globo terráqueo interactivo con fronteras de países y socios globales"
    >
      <Globe
        ref={globeRef}

        // ==========================================
        // DIMENSIONES
        // ==========================================

        width={size.width}
        height={size.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl={null}

        // ==========================================
        // ATMÓSFERA
        // ==========================================

        showAtmosphere
        atmosphereColor="#7FCC27"
        atmosphereAltitude={0.14}

        // ==========================================
        // PAÍSES
        // ==========================================

        polygonsData={countries}
        polygonGeoJsonGeometry="geometry"
        polygonCapColor={(country: object) => {
          const countryFeature = country as CountryFeature
          const id = String(countryFeature.id).padStart(3, '0')
          const active = id === partners.find(p => p.id === selectedId)?.geoId
          const hovered = id === hoveredId
          const isSelectable = !!partnerForCountry(countryFeature)

          if (active) return '#E9FF8F'
          if (hovered) return '#E9FF8F'
          if (isSelectable) return '#b6e537'
          return 'rgba(16, 32, 38, 0.8)'
        }}
        polygonSideColor={() => 'rgba(36, 55, 61, 0.8)'}
        polygonStrokeColor={(country: object) =>
          partnerForCountry(country as CountryFeature) ? '#b6e537' : '#24373d'
        }
        polygonAltitude={(country: object) => {
          const id = String((country as CountryFeature).id).padStart(3, '0')
          const selectedPartner = partners.find(p => p.id === selectedId)
          return id === hoveredId || id === selectedPartner?.geoId ? 0.03 : 0.006
        }}
        polygonsTransitionDuration={260}
        polygonLabel={(country: object) => {
          const partner = partnerForCountry(country as CountryFeature)
          return partner ? `
            <div class="globe-tooltip">
              <b>${partner.country}</b>
              <br/>
              ${partner.name}
            </div>
          ` : ''
        }}
        onPolygonHover={(country: object | null) =>
          setHoveredId(
            country ? String((country as CountryFeature).id).padStart(3, '0') : null,
          )
        }
        onPolygonClick={(country: object) => {
          const partner = partnerForCountry(country as CountryFeature)
          if (partner) focusPartner(partner)
        }}

        pointsData={partners}
        pointLat="lat"
        pointLng="lng"
        pointColor={(point: object) =>
          (point as Partner).id === selectedId ? '#E9FF8F' : '#b6e537'
        }
        pointRadius={(point: object) =>
          (point as Partner).id === selectedId ? 0.17 : 0.1
        }
        pointAltitude={0.02}
        pointLabel={(point: object) => {
          const partner = point as Partner
          return `
            <div class="globe-tooltip">
              <b>${partner.country}</b>
              <br/>
              ${partner.name}
            </div>
          `
        }}
        onPointClick={(point: object) => focusPartner(point as Partner)}

        htmlElementsData={partners}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.03}
        htmlElement={(data: object) => {
          const partner = data as Partner
          officeStyles

          const element = document.createElement('div')
          element.className = 'globe-office-marker'

          element.innerHTML = `
            <div class="office-box">
              <div class="office-country">${partner.country}</div>
              <div class="office-name">${partner.name}</div>
            </div>
            <div class="office-pointer"></div>
          `

          element.onclick = event => {
            event.stopPropagation()
            focusPartner(partner)
          }

          return element
        }}

        onGlobeReady={() => {
          globeRef.current?.pointOfView(INITIAL_VIEW, 0)

          const material = globeRef.current?.globeMaterial() as THREE.MeshPhongMaterial
          if (material) {
            // Cuerpo del globo negro, SIN brillo especular blanco
            material.color.set('#000000')
            material.emissive.set('#000000')
            material.specular.set('#000000')
            material.shininess = 0
            material.reflectivity = 0
          }

          // Reduce la luz puntual interna que aún proyecta el reflejo blanco
          const scene = globeRef.current?.scene?.()
          scene?.traverse(obj => {
            const light = obj as THREE.PointLight
            if (light.isPointLight) {
              light.intensity *= 0.35
            }
          })
        }}
      />

      <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-code text-[9px] tracking-[.17em] text-[#829299] uppercase">
        Selecciona un país u oficina para obtener más detalles
      </p>
    </div>
  )
}
)

export default PartnerGlobe