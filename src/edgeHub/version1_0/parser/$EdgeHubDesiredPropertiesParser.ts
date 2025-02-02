﻿// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { $EdgeHubDesiredProperties } from '../model/$EdgeHubDesiredProperties';
import { $EdgeHubDesiredPropertiesViewModel } from '../../../viewModel/$EdgeHubDesiredPropertiesViewModel';
import { EdgeParseException } from '../../../errors/edgeParseException';
import { PATHS } from '../../../utilities/constants';

export const get$EdgeHubDesiredPropertiesViewModel = (edgeHubDesiredProperties: $EdgeHubDesiredProperties): $EdgeHubDesiredPropertiesViewModel => {
    const $edgeHubDesiredPropertiesViewModel =  {
        routes: get$EdgeHubRoutes(edgeHubDesiredProperties),
        schemaVersion: get$EdgeHubSchemaVersion(edgeHubDesiredProperties),
        storeAndForwardTimeToLive: get$EdgeHubStoreAndForwardTimeToLive(edgeHubDesiredProperties)
    };

    return $edgeHubDesiredPropertiesViewModel;
};

export const get$EdgeHubSchemaVersion = (edgeHubDesiredProperties: $EdgeHubDesiredProperties): string => {
    const schemaVersion = edgeHubDesiredProperties.schemaVersion;
    if (!schemaVersion) {
        throw new EdgeParseException([
            PATHS.$EDGE_HUB,
            PATHS.DESIRED_PROPERTIES,
            PATHS.SCHEMA_VERSION].join('.'));
    }

    return schemaVersion;
};

export const get$EdgeHubRoutes = (edgeHubDesiredProperties: $EdgeHubDesiredProperties): object => {
    if (!edgeHubDesiredProperties.routes) {
        throw new EdgeParseException([
            PATHS.$EDGE_HUB,
            PATHS.DESIRED_PROPERTIES,
            PATHS.ROUTES].join('.'));
    }

    return edgeHubDesiredProperties.routes;
};

export const get$EdgeHubStoreAndForwardTimeToLive = (edgeHubDesiredProperties: $EdgeHubDesiredProperties): number => {
    if (!edgeHubDesiredProperties.storeAndForwardConfiguration) {
        throw new EdgeParseException([
            PATHS.$EDGE_HUB,
            PATHS.DESIRED_PROPERTIES,
            PATHS.STORE_FORWARD_CONFIGURATION].join('.'));
    }

    const timeToLiveSecs = edgeHubDesiredProperties.storeAndForwardConfiguration.timeToLiveSecs;
    if (timeToLiveSecs === undefined || timeToLiveSecs === null) {
        throw new EdgeParseException([
            PATHS.$EDGE_HUB,
            PATHS.DESIRED_PROPERTIES,
            PATHS.STORE_FORWARD_CONFIGURATION,
            PATHS.TIME_TO_LIVE_SECONDS].join('.'));
    }

    return timeToLiveSecs;
};
