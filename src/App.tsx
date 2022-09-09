// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved. // SPDX-License-Identifier: MIT-0
import Form from "@awsui/components-react/form";
import Header from "@awsui/components-react/header";
import SpaceBetween from "@awsui/components-react/space-between";
import Button from "@awsui/components-react/button";
import AppLayout from "@awsui/components-react/app-layout";
import ButtonDropdown from "@cloudscape-design/components/button-dropdown";
import { Box, Pagination, Link, CollectionPreferences, Icon, Badge, TextContent } from "@cloudscape-design/components";
import { TextFilter } from "@cloudscape-design/components";
import Table from "@cloudscape-design/components/table";
import { SideNavigation } from "@cloudscape-design/components";
import { BreadcrumbGroup } from "@cloudscape-design/components";
import { Container } from "@cloudscape-design/components";
import React, { useState } from "react";

function App() {

  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [activeHref, setActiveHref] = useState(
    "#components/repositories"
  );
  const cloneURLItems = [
    { text: "Clone HTTPS", id: "a", disabled: false },
    { text: "Clone SSH", id: "b", disabled: false },
    { text: "Clone HTTPS(GRC)", id: "c", disabled: false },
    { text: "Connection Step", id: "d", disabled: false },
  ]
  const [active, setActive] = useState(false)
  console.log("active:::::::::::::", active)

  return (
    <AppLayout
      navigation={
        <Container
          header={
            <Header
              variant="h1"
            >
              <Header
                variant="h1"
                description="Developer Tools"
              >
              </Header>
              CodeCommit
            </Header>
          }
        >

          <SideNavigation
            activeHref={activeHref}
            onFollow={event => {
              if (!event.detail.external) {
                event.preventDefault();
                setActiveHref(event.detail.href);
              }
            }}
            items={[
              { type: "divider" },
              {
                type: "section",
                text: "Source . CodeCommit",
                items: [
                  {
                    type: "link",
                    text: "Getting Started",
                    href: "#components/gettingStarted"
                  },
                  {
                    type: "link",
                    text: "Repositories",
                    href: "#components/repositories"
                  },
                  {
                    type: "link",
                    text: "Approval rule templates",
                    href: "#components/approval"
                  }
                ]
              },
              {
                type: "section",
                text: "Artifacts . CodeArtifacts",
                items: [
                ]
              },
              {
                type: "section",
                text: "Build . CodeBuild",
                items: [
                ]
              },
              {
                type: "section",
                text: "Deploy . CodeDeploy",
                items: [
                ]
              },
              {
                type: "section",
                text: "Pipeline . CodePipeline",
                items: [
                ]
              },
              {
                type: "section",              
                text: "Settings .",
                items: [
                ]
              },
              { type: "link", info: <Icon name="search"></Icon>, text: "Go to resource", href: "#/page4" },
              { type: "link", info: <Icon name="folder-open"></Icon>, text: "Feedback", href: "#/page5" },

            ]}
          />
        </Container>
      }

      content={
        <Form key={1}
          header={
            <BreadcrumbGroup
              items={[
                { text: "Developer Tools", href: "#" },
                { text: "CodeCommit", href: "#codeCommit" },
                {
                  text: activeHref,
                  href: activeHref
                }
              ]}
              ariaLabel="Breadcrumbs"
            />
          }
        >


          <Table key={2}
            header={<Header
              variant="h1"
              info={<Link>Info</Link>}
              actions={selectedItems.length <= 0 ?

                <SpaceBetween direction="horizontal" size="l">
                  <Button disabled>
                    <Icon name="refresh"></Icon>
                  </Button>
                  <ButtonDropdown
                    items={[]}
                    disabled
                  >
                    <Icon name="notification"></Icon>
                    Notify
                  </ButtonDropdown>
                  <ButtonDropdown
                    items={cloneURLItems}
                    disabled
                  >
                    CloneURL
                  </ButtonDropdown>
                  <Button disabled>
                    View Repository
                  </Button>
                  <Button disabled>
                    Delete Repository
                  </Button>
                  <Button variant="primary">
                    Create Repository
                  </Button>
                </SpaceBetween>

                :
                <SpaceBetween direction="horizontal" size="l">
                  <Button>
                    <Icon name="refresh"></Icon>
                  </Button>
                  <ButtonDropdown
                    items={[]}
                  >
                    <Icon name="notification"></Icon>
                    Notify
                  </ButtonDropdown>
                  <ButtonDropdown
                    onItemClick={() => setActive(true)}
                    items={cloneURLItems}
                  >
                    CloneURL
                  </ButtonDropdown>
                  <Button >
                    View Repository
                  </Button>
                  <Button >
                    Delete Repository
                  </Button>
                  <Button variant="primary">
                    Create Repository
                  </Button>
                </SpaceBetween>
              }
            >
              Repositories
            </Header>}
            selectedItems={selectedItems}
            onSelectionChange={({ detail }) =>
              setSelectedItems(detail.selectedItems)
            }

            ariaLabels={{
              selectionGroupLabel: "Items selection",
              allItemsSelectionLabel: ({ selectedItems }) =>
                `${selectedItems.length} ${selectedItems.length === 1 ? "item" : "items"
                } selected`,
              itemSelectionLabel: ({ selectedItems }, item) => {
                const isItemSelected = selectedItems.filter(
                  i => i.id === item.id
                ).length;
                return `${item.id} is ${isItemSelected ? "" : "not"
                  } selected`;
              }
            }}
            columnDefinitions={[
              {
                id: "name",
                header: "Name",
                cell: e => e.name,
                sortingField: "name"
              },
              {
                id: "description",
                header: "Description",
                cell: e => e.description
              },
              {
                id: "lastModified",
                header: "Last Modified",
                cell: e => e.lastModified,
                sortingField: selectedItems.length > 0 ? "lastModified" : ""
              },
              {
                id: "cloneURL",
                header: active == true ? "Clone URLs" : "",
                cell: e => e.cloneURL
              }
            ]}
            items={[
              {
                id: 1,
                name: <Link>readdoc-ui</Link>,
                alt: "First",
                description: "-",
                lastModified: "14 hours ago",
                cloneURL: active == true ? <><Link><Icon name="folder-open"></Icon>HTTP</Link> <Link> <Icon name="folder-open"></Icon>SSH</Link>  <Link><Icon name="folder-open"></Icon> HTTP(GRC)</Link></> : ""

              },
              {
                id: 2,
                name: <Link>readdoc-api</Link>,
                description: "-",
                lastModified: "15 hours ago",
                cloneURL: active == true ? <><Link><Icon name="folder-open"></Icon>HTTP</Link> <Link> <Icon name="folder-open"></Icon>SSH</Link>  <Link><Icon name="folder-open"></Icon> HTTP(GRC)</Link></> : ""
              },
              {
                id: 3,
                name: <Link>digitalform-api</Link>,
                description: "-",
                lastModified: "3 days ago",
                cloneURL: active == true ? <><Link><Icon name="folder-open"></Icon>HTTP</Link> <Link> <Icon name="folder-open"></Icon>SSH</Link>  <Link><Icon name="folder-open"></Icon> HTTP(GRC)</Link></> : ""
              },
              {
                id: 4,
                name: <Link>digitalform-ui</Link>,
                description: "-",
                lastModified: "6 days ago",
                cloneURL: active == true ? <><Link><Icon name="folder-open"></Icon>HTTP</Link> <Link> <Icon name="folder-open"></Icon>SSH</Link>  <Link><Icon name="folder-open"></Icon> HTTP(GRC)</Link></> : ""
              },

            ]}
            loadingText="Loading resources"
            selectionType="single"
            trackBy="id"
            visibleColumns={[
              "name",
              "description",
              "lastModified",
              "cloneURL"
            ]}
            empty={
              <Box textAlign="center" color="inherit">
                <b>No resources</b>
                <Box
                  padding={{ bottom: "s" }}
                  variant="p"
                  color="inherit"
                >
                  No resources to display.
                </Box>
                <Button>Create resource</Button>
              </Box>
            }
            filter={
              <TextFilter
                filteringPlaceholder="Find"
                filteringText=""
              />
            }

            pagination={
              <Pagination
                currentPageIndex={1}
                pagesCount={1}
                ariaLabels={{
                  nextPageLabel: "Next page",
                  previousPageLabel: "Previous page",
                  pageLabel: pageNumber =>
                    `Page ${pageNumber} of all pages`
                }}
              />
            }
            preferences={
              <CollectionPreferences
                title="Preferences"
                confirmLabel="Confirm"
                cancelLabel="Cancel"
                preferences={{
                  pageSize: 10,
                  visibleContent: [
                    "name",
                    "description",
                    "lastModified",
                  ]
                }}
                pageSizePreference={{
                  title: "Select page size",
                  options: [
                    { value: 10, label: "10 resources" },
                    { value: 20, label: "20 resources" }
                  ]
                }}
                visibleContentPreference={{
                  title: "Select visible content",
                  options: [
                    {
                      label: "Main distribution properties",
                      options: [
                        {
                          id: "name",
                          label: "Name",
                          editable: false
                        },
                        {
                          id: "description",
                          label: "Description"
                        },
                        { id: "lastModified", label: "Last Modified" },
                      ]
                    }
                  ]
                }}
              />
            }
          />

        </Form>
        // })
      }
    />
  );
}

export default App;
