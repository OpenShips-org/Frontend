import { getColorForVesselType } from "@/lib/iconUtils";

export function GenerateVesselIcon(type: string) {
    const color = getColorForVesselType(parseInt(type));

    return `\
        <svg viewBox="0 0 447.342 447.342" xmlns="http://www.w3.org/2000/svg" fill="${color}" stroke="#000" stroke-width="10" stroke-linejoin="round" stroke-linecap="round">\
            <path d="m 223.67248,31.103434 c -4.53544,0 -8.60966,2.830518 -10.17995,7.093716 L 79.252883,401.62666 c -1.542523,4.15867 -0.386221,8.83466 2.90788,11.8075 3.282881,2.98288 8.052182,3.65021 12.042545,1.69371 L 196.82065,364.82048 c 16.927,-8.28841 36.74063,-8.289 53.66705,0 l 102.65572,50.30798 c 3.97914,1.94764 8.74962,1.27913 12.04254,-1.6937 3.29352,-2.97344 4.44037,-7.65888 2.9073,-11.80692 L 233.85183,38.19656 c -1.57086,-4.261427 -5.6445,-7.093716 -10.17935,-7.093126 z"/>\
        </svg>\
    `;
}
