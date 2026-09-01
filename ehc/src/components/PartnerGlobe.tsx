import { useEffect, useMemo, useRef, useState } from 'react'
import Globe from 'react-globe.gl'
import { feature } from 'topojson-client'
import countriesTopology from 'world-atlas/countries-110m.json'
import type { GlobeInstance } from 'globe.gl'
import type { Partner } from '../lib/data'

interface PartnerGlobeProps {
  partners: Partner[]
  selectedId: string
  onSelect: (partner: Partner) => void
  resetToken: number
}

interface CountryFeature {
  id: string | number
  properties?: Record<string, unknown>
  geometry: object
}

const INITIAL_VIEW = {
  lat: 12,
  lng: -79,
  altitude: 1.85
}

export default function PartnerGlobe({
  partners,
  selectedId,
  onSelect,
  resetToken
}: PartnerGlobeProps) {
  const globeRef = useRef<GlobeInstance | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const [size, setSize] = useState({
    width: 720,
    height: 496
  })

  // ==========================================
  // OBTENER PAÍSES DEL TOPOJSON
  // ==========================================

  const countries = useMemo(() => {
    const topology =
      countriesTopology as unknown as Parameters<typeof feature>[0]

    const collection = feature(
      topology,
      topology.objects.countries
    ) as unknown as {
      features: CountryFeature[]
    }

    return collection.features
  }, [])

  // ==========================================
  // BUSCAR PARTNER POR PAÍS
  // ==========================================

  const partnerForCountry = (
    country: CountryFeature | null
  ) => {
    return country
      ? partners.find(
          partner =>
            partner.geoId ===
            String(country.id).padStart(3, '0')
        )
      : undefined
  }

  // ==========================================
  // ENFOCAR PARTNER
  // ==========================================

  const focusPartner = (partner: Partner) => {
    globeRef.current?.pointOfView(
      {
        lat: partner.lat,
        lng: partner.lng,
        altitude: 0.72
      },
      1100
    )

    onSelect(partner)
  }

  // ==========================================
  // RESET VIEW
  // ==========================================

  useEffect(() => {
    if (resetToken > 0) {
      globeRef.current?.pointOfView(
        INITIAL_VIEW,
        900
      )
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

      setSize({
        width,
        height: Math.max(
          360,
          Math.min(496, width * 0.69)
        )
      })
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

        atmosphereColor="#34FF00"

        atmosphereAltitude={0.14}

        // ==========================================
        // PAÍSES
        // ==========================================

        polygonsData={countries}

        polygonGeoJsonGeometry="geometry"

        polygonCapColor={(country: object) => {
          const countryFeature =
            country as CountryFeature

          const id = String(
            countryFeature.id
          ).padStart(3, '0')

          const active =
            id ===
            partners.find(
              partner =>
                partner.id === selectedId
            )?.geoId

          const hovered =
            id === hoveredId

          const isSelectable =
            !!partnerForCountry(
              countryFeature
            )

          // PAÍS ACTIVO
          if (active) {
            return '#E9FF8F'
          }

          // HOVER
          if (hovered) {
            return '#E9FF8F'
          }

          // PAÍS CON PARTNER
          if (isSelectable) {
            return '#b6e537'
          }

          // PAÍSES NORMALES
          return 'rgba(16, 32, 38, 0.8)'
        }}

        polygonSideColor={() =>
          'rgba(36, 55, 61, 0.8)'
        }

        polygonStrokeColor={(country: object) =>
          partnerForCountry(
            country as CountryFeature
          )
            ? '#b6e537'
            : '#24373d'
        }

        polygonAltitude={(country: object) => {
          const id = String(
            (country as CountryFeature).id
          ).padStart(3, '0')

          const selectedPartner =
            partners.find(
              partner =>
                partner.id === selectedId
            )

          return id === hoveredId ||
            id === selectedPartner?.geoId
            ? 0.03
            : 0.006
        }}

        polygonsTransitionDuration={260}

        polygonLabel={(country: object) => {
          const partner =
            partnerForCountry(
              country as CountryFeature
            )

          return partner
            ? `
              <div class="globe-tooltip">
                <b>${partner.country}</b>
                <br/>
                ${partner.name}
              </div>
            `
            : ''
        }}

        onPolygonHover={(
          country: object | null
        ) =>
          setHoveredId(
            country
              ? String(
                  (country as CountryFeature).id
                ).padStart(3, '0')
              : null
          )
        }

        onPolygonClick={(country: object) => {
          const partner =
            partnerForCountry(
              country as CountryFeature
            )

          if (partner) {
            focusPartner(partner)
          }
        }}

        // ==========================================
        // PUNTOS DE UBICACIÓN
        // ==========================================

        pointsData={partners}

        pointLat="lat"

        pointLng="lng"

        pointColor={(point: object) =>
          (point as Partner).id === selectedId
            ? '#d6dddc'
            : '#b6e537'
        }

        pointRadius={(point: object) =>
          (point as Partner).id === selectedId
            ? 0.17
            : 0.1
        }

        pointAltitude={0.02}

        pointLabel={(point: object) => {
          const partner =
            point as Partner

          return `
            <div class="globe-tooltip">
              <b>${partner.country}</b>
              <br/>
              ${partner.name}
            </div>
          `
        }}

        onPointClick={(point: object) =>
          focusPartner(
            point as Partner
          )
        }

        // ==========================================
        // LABELS / OFICINAS
        // ==========================================

        htmlElementsData={partners}

        htmlLat="lat"

        htmlLng="lng"

        htmlAltitude={0.03}

        htmlElement={(data: object) => {
          const partner = data as Partner

          const element =
            document.createElement('div')

          element.className =
            'globe-office-marker'

          // Modificado para texto apilado, mayúsculas y color negro
          element.innerHTML = `
            <div class="office-label" style="color: black; text-align: center; text-transform: uppercase; font-weight: bold; text-shadow: 0px 0px 4px rgba(255,255,255,0.7); font-family: sans-serif;">
              <div class="office-country">
                ${partner.country}
              </div>

              <div class="office-name">
                ${partner.name}
              </div>
            </div>

            <div class="office-pointer"></div>
          `

          // CLICK EN LABEL
          element.onclick = event => {
            event.stopPropagation()

            focusPartner(partner)
          }

          return element
        }}

        // ==========================================
        // INICIALIZACIÓN
        // ==========================================

        onGlobeReady={() =>
          globeRef.current?.pointOfView(
            INITIAL_VIEW,
            0
          )
        }
      />

      {/* TEXTO INFERIOR */}

      <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap font-code text-[9px] tracking-[.17em] text-[#829299] uppercase">
        Selecciona un país, oficina o nodo para explorar su canal
      </p>
    </div>
  )
}

export { INITIAL_VIEW }