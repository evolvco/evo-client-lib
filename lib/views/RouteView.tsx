import { useParams } from 'react-router-dom';
import { View } from './View';
import type {ViewProps } from '../types'

export function RouteView({ view, params }: ViewProps): JSX.Element {
    const vparams = { ...useParams(), ...params };
    return <View key={vparams['*'] as string} view={view} params={vparams} />;
}
