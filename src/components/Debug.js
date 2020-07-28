/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React from 'react';

const Debug = ({ isOpen, content, config, metadata, previewResourceUrl }) => {
  if (!isOpen) {
    return null;
  }
  
  return (
    <code>
      <pre>
        <strong>previewResourceUrl:</strong>
        {JSON.stringify(previewResourceUrl, null, 2)}<br />

        <strong>config:</strong>
        {JSON.stringify(config, null, 2)}<br />

        <strong>metadata:</strong>
        {JSON.stringify(metadata, null, 2)}<br />
        
        <strong>content:</strong>
        {JSON.stringify(content, null, 2)}<br />
      </pre>
    </code>
  );
};

export default Debug;
