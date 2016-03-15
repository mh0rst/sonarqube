/*
 * SonarQube
 * Copyright (C) 2009-2016 SonarSource SA
 * mailto:contact AT sonarsource DOT com
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
package org.sonar.core.platform;

import com.google.common.io.Resources;
import java.io.IOException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import org.picocontainer.injectors.ProviderAdapter;
import org.sonar.api.SonarQubeVersion;
import org.sonar.api.utils.System2;
import org.sonar.api.utils.Version;

public class SonarQubeVersionProvider extends ProviderAdapter {

  private static final String FILE_PATH = "/sq-version.txt";

  private SonarQubeVersion version = null;

  public SonarQubeVersion provide(System2 system) {
    if (version == null) {
      try {
        URL url = system.getResource(FILE_PATH);
        String versionInFile = Resources.toString(url, StandardCharsets.UTF_8);
        version = new SonarQubeVersion(Version.parse(versionInFile));
      } catch (IOException e) {
        throw new IllegalStateException("Can not load " + FILE_PATH + " from classpath", e);
      }
    }
    return version;
  }
}
