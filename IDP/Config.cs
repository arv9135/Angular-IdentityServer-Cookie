// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace IDP
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
            new IdentityResource[]
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("scope1"),
                new ApiScope("scope2"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client {
                    ClientId = "angular_spa",
                    ClientName = "Angular SPA",
                    AllowedGrantTypes = GrantTypes.Code,
                    RequireClientSecret = false,
                    RequirePkce = true,
                    RequireConsent = false,
                    AllowedScopes = { "openid", "profile", "offline_access" },
                    RedirectUris = {"https://localhost:4200"},
                    PostLogoutRedirectUris = {"https://localhost:4200"},
                    AllowedCorsOrigins = {"https://localhost:4200"},
                    AllowAccessTokensViaBrowser = true,
                    AccessTokenLifetime = 3600,
                    AlwaysIncludeUserClaimsInIdToken = true,
                    AllowOfflineAccess = true,
                    IdentityTokenLifetime = 3600,
                    RefreshTokenUsage=TokenUsage.OneTimeOnly,
                    UpdateAccessTokenClaimsOnRefresh = true
                },
            };
    }
}