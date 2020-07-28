/*
 * Copyright 2020 Acoustic, L.P.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import React, { useState, useEffect, useRef } from 'react';
import Preview from 'components/Preview';
import ControlPanel from 'components/ControlPanel';
import Debug from 'components/Debug';

import { getPreviewUrl } from '../utils/utils';

const wchUIExt = window.wchUIExt;

const Container = () => {
  const [content, setContent] = useState(null);
  const [config, setConfig] = useState(null);
  const [previewResourceUrl, setPreviewResourceUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [debug, setDebug] = useState(false);
  const previewRef = useRef(null);

  const getContent = () => {
    wchUIExt.getContent().then((content) => {
      setContent(content);
    });
  };

  const getElementConfig = () => {
    wchUIExt.getDefinition().then((definition) => {
      const { elementConfig } = definition.uiExtensions;
      setConfig(elementConfig);
    });
  };

  const getTenantConfig = () => {
    wchUIExt.getTenantConfig().then((tenantConfig) => {
      const { previewResourceUrl } = tenantConfig;
      setPreviewResourceUrl(previewResourceUrl);
    });
  };

  const refreshPreview = () => {
    previewRef.current.src += '';
  };

  const toggleDebugInfo = () => {
    setDebug(!debug);
  };

  useEffect(() => {
    getContent();
    getElementConfig();
    getTenantConfig();

    wchUIExt.requestResizeFrame(1000);
    wchUIExt.on('contentUpdate', refreshPreview);
  }, []);

  useEffect(() => {
    if (!config || !content || !previewResourceUrl) {
      return;
    }

    const previewUrl = getPreviewUrl({ config, content, previewResourceUrl });
    setPreviewUrl(previewUrl);
  }, [config, content, previewResourceUrl]);

  if (!previewUrl) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ControlPanel previewUrl={previewUrl} toggleDebugInfo={toggleDebugInfo} />
      <Debug
        isOpen={debug}
        content={content}
        config={config}
        previewResourceUrl={previewResourceUrl}
      />
      <Preview ref={previewRef} url={previewUrl} />
    </>
  );
};

export default Container;
