/*
 * SonarQube
 * Copyright (C) 2009-2018 SonarSource SA
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
import * as React from 'react';
import { Link } from 'react-router';
import ProjectCardQualityGate from './ProjectCardQualityGate';
import ProjectCardOverallMeasures from './ProjectCardOverallMeasures';
import ProjectCardOrganizationContainer from './ProjectCardOrganizationContainer';
import Favorite from '../../../components/controls/Favorite';
import DateTimeFormatter from '../../../components/intl/DateTimeFormatter';
import TagsList from '../../../components/tags/TagsList';
import PrivacyBadgeContainer from '../../../components/common/PrivacyBadgeContainer';
import { translate, translateWithParameters } from '../../../helpers/l10n';
import { Project } from '../types';
import { Organization } from '../../../app/types';

interface Props {
  height: number;
  organization: Organization | undefined;
  project: Project;
}

export default function ProjectCardOverall({ height, organization, project }: Props) {
  const { measures } = project;

  const hasTags = project.tags.length > 0;

  return (
    <div className="boxed-group project-card" data-key={project.key} style={{ height }}>
      <div className="boxed-group-header clearfix">
        <div className="project-card-header">
          {project.isFavorite !== undefined && (
            <Favorite
              className="spacer-right"
              component={project.key}
              favorite={project.isFavorite}
              qualifier="TRK"
            />
          )}
          <h2 className="project-card-name">
            {!organization && (
              <ProjectCardOrganizationContainer organization={project.organization} />
            )}
            <Link to={{ pathname: '/dashboard', query: { id: project.key } }}>{project.name}</Link>
          </h2>
          {project.analysisDate && <ProjectCardQualityGate status={measures['alert_status']} />}
          <div className="project-card-header-right">
            <PrivacyBadgeContainer
              className="spacer-left"
              organization={organization || project.organization}
              qualifier="TRK"
              tooltipProps={{ projectKey: project.key }}
              visibility={project.visibility}
            />
            {hasTags && <TagsList className="spacer-left note" tags={project.tags} />}
          </div>
        </div>
        {project.analysisDate && (
          <div className="project-card-dates note text-right">
            <DateTimeFormatter date={project.analysisDate}>
              {formattedDate => (
                <span className="big-spacer-left">
                  {translateWithParameters('projects.last_analysis_on_x', formattedDate)}
                </span>
              )}
            </DateTimeFormatter>
          </div>
        )}
      </div>

      {project.analysisDate ? (
        <div className="boxed-group-inner">
          {<ProjectCardOverallMeasures measures={measures} />}
        </div>
      ) : (
        <div className="boxed-group-inner">
          <div className="note project-card-not-analyzed">{translate('projects.not_analyzed')}</div>
        </div>
      )}
    </div>
  );
}
